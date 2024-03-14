import { PublicClientApplication } from "@azure/msal-browser";
const button = document.getElementById("btn");

1

const msalConfig = {
  auth: {
    clientId: "d1e79748-03e2-4730-ad96-cfb8ef48b58c",
    authority:
      "https://login.microsoftonline.com/2a4a5a22-099a-4115-86f7-35b1367f0ea9",
    redirectUri: "http://localhost:9000/",
  },
  cache: {
    cacheLocation: "localStorage",
  },
};
 
const login = async () => {
    console.log("login called");
  const msalInstance =
    await PublicClientApplication.createPublicClientApplication(msalConfig);
 
  const response = await msalInstance.loginPopup({
    scopes: ["user.read"],
    prompt: "select_account",
    redirectUri: "http://localhost:9000/",
    popup: true,
  });
 
  console.log(response);
  const myAccounts = msalInstance.getAllAccounts();
 
  console.log(myAccounts);
  if (myAccounts.length > 0) {
    msalInstance.setActiveAccount(myAccounts[0]);
  }
 
  const request = {
    scopes: ["User.Read"],
  };
 
  msalInstance
    .acquireTokenSilent(request)
    .then((tokenResponse) => {
      var headers = new Headers();
      var bearer = "Bearer " + tokenResponse.accessToken;
      console.log(bearer);
      headers.append("Authorization", bearer);
      var options = {
        method: "GET",
        headers: headers,
      };
      var graphEndpoint = "https://graph.microsoft.com/v1.0/me";
 
      fetch(graphEndpoint, options)
        .then((resp) => {
          console.log("graph response");
          return resp.json();
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("employee-id", res.id);
          window.location.href='/';
          // fetch("http://localhost:8000/users", {
          //   method: "post",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
 
          //   body: JSON.stringify({
          //     employeeId: res.id,
          //     mailId: res.mail,
          //     phone: res.mobilePhone,
          //     name: res.displayName,
          //   }),
          // })
          //   .then(() => {
                
          //     window.location.href = "/";
              
              
          //   })
            // .catch((err) => console.log(err));
        });
    })
    .catch(async (error) => {
      console.log(error.name);
      console.log(error);
      if (error.name === "InteractionRequiredAuthError") {

        return await msalInstance.acquireTokenPopup(request);
      }
    });
};

button.addEventListener("click", () => {
  login();
})
 
// module.exports.login = login;


