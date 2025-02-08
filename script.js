document.addEventListener("DOMContentLoaded", loadPreviousData);
const form = document.getElementById("cgpa-form");
const coursesDiv = document.getElementById("courses");

function addCourse() {
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="Course Name" required>
        <input type="number" placeholder="Grade (0-5)" required>
        <input type="number" placeholder="Credit Units" required>
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    coursesDiv.appendChild(div);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let totalPoints = 0, totalUnits = 0;
    document.querySelectorAll("#courses div").forEach(course => {
        const inputs = course.querySelectorAll("input");
        let grade = parseFloat(inputs[1].value);
        let units = parseFloat(inputs[2].value);
        if (!isNaN(grade) && !isNaN(units)) {
            totalPoints += grade * units;
            totalUnits += units;
        }
    });
    let cgpa = totalUnits ? (totalPoints / totalUnits).toFixed(2) : "0.00";
    document.getElementById("cgpa-result").textContent = cgpa;
    localStorage.setItem("cgpa", cgpa);
});

function loadPreviousData() {
    let savedCGPA = localStorage.getItem("cgpa");
    if (savedCGPA) {
        document.getElementById("cgpa-result").textContent = savedCGPA;
    }
}
