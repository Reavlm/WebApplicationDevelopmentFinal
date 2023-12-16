
let users = [];


users.push({ username: 'teacher', password: 'teacherpass', role: 'teacher', enrolledCourses: [] });
users.push({ username: 'student', password: 'studentpass', role: 'user', enrolledCourses: ['Math', 'History'] });

function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = { username, email, password, role: "user", enrolledCourses: [] }; // Default role is user
  users.push(user);

  // Save user information in local storage for login 
  saveUserData();

  // Redirect to login page after signup
  window.location.href = "login.html";
}

function login() {
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;

  const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

  if (user) {
    // Save the logged-in user 
    localStorage.setItem("loggedInUser", user.username);

    // Redirect based on user role
    if (user.role === "teacher") {
      window.location.href = "teacher-dashboard.html";
    } else {
      window.location.href = "user-dashboard.html";
    }
  } else {
    alert("Invalid username or password");
  }
}

// Save user information in local storage 
function saveUserData() {
  localStorage.setItem("users", JSON.stringify(users));
}


function loadUserData() {
  const userData = localStorage.getItem("users");
  if (userData) {
    users = JSON.parse(userData);
  }
}

// Get the current logged-in user (used for dynamic content in user-dashboard.html)
function getCurrentUser() {
  const loggedInUsername = localStorage.getItem("loggedInUser");
  return users.find(user => user.username === loggedInUsername);
}

// Function to dynamically generate the list of enrolled courses
function displayEnrolledCourses() {
  const enrolledCoursesList = document.getElementById("enrolledCoursesList");

  // Assume the logged-in user is stored in the 'currentUser' variable
  const currentUser = getCurrentUser();

  if (currentUser && currentUser.enrolledCourses && currentUser.enrolledCourses.length > 0) {
    // Clear existing content
    enrolledCoursesList.innerHTML = "";

    // Populate the list dynamically
    currentUser.enrolledCourses.forEach(course => {
      const listItem = document.createElement("li");
      listItem.textContent = course;
      enrolledCoursesList.appendChild(listItem);
    });
  } else {
    enrolledCoursesList.innerHTML = "<li>No enrolled courses</li>";
  }
}

// Call loadUserData on page load
loadUserData();
// Continue to next
// Function to drop a course
function drop(courseName) {
  const currentUser = getCurrentUser();

  if (currentUser) {
    // Check if the user is enrolled in the course
    const courseIndex = currentUser.enrolledCourses.indexOf(courseName);

    if (courseIndex !== -1) {
      // Remove the course from the enrolled courses list
      currentUser.enrolledCourses.splice(courseIndex, 1);

      // Save the updated user data
      saveUserData();

      // Refresh the enrolled courses list on the user dashboard
      displayEnrolledCourses();

      alert(`Successfully dropped ${courseName}`);
    } else {
      alert(`You are not enrolled in ${courseName}`);
    }
  } else {
    alert("User not found. Please log in again.");
    window.location.href = "login.html";
  }
}