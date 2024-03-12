document.getElementById("vehicleForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let model = document.getElementById("model").value;
    let year = document.getElementById("year").value;
    let color = document.getElementById("color").value;
    
    // You can send this data to your backend API using fetch or any other method
    // For demonstration purposes, we'll just log the data to the console
    console.log("Make:", make);
    console.log("Model:", model);
    console.log("Year:", year);
    console.log("Color:", color);
    
    // Clear the form after submission
    document.getElementById("vehicleForm").reset();
});