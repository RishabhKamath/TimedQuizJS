// Get high scores from local storage
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Sort high scores by score in descending order
highScores.sort((a, b) => b.score - a.score);

// Display high scores in table
let scoresHTML = "";
for (let i = 0; i < highScores.length; i++) {
  scoresHTML += `<tr>
    <td>${highScores[i].initials}</td>
    <td>${highScores[i].score}</td>
  </tr>`;
}
document.getElementById("scores").innerHTML = scoresHTML;

