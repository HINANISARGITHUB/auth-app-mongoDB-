const { useState } = React; //enable react not use import in backend use const

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // // signup
  // const signUp = () => {
  //   fetch("http://localhost:3000/signup", {
  //     method: "POST",
  //     headers: {
  //       // headers ia a reserve word
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   })
  //     .then((res) => res.json()) // json form may yani string may convert karo
  //     .then((data) => alert(data.message)) // message give in signup server.js
     

  
  // };
  const signUp = () => {
  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      // SUCCESS CASE
      if (data.message === "User Registered") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
      }

      // USER EXISTS CASE
      else if (data.message === "User already exists") {
        Swal.fire({
          icon: "warning",
          title: "Already Exists",
          text: data.message,
        });
      }

      // ANY OTHER MESSAGE
      else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong",
      });
    });
};

  // // login
  // const login = () => {
  //   fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       // headers ia a reserve word
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => alert(data.message)); // message give in signup server.js
  // };

  const login = () => {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.message === "Login Success") {
        Swal.fire({
          icon: "success",
          title: "Welcome Back 🎉",
          text: data.message,
        });
      }

      else if (data.message === "Invalid Credentials") {
        Swal.fire({
          icon: "error",
          title: "Login Failed ❌",
          text: data.message,
        });
      }

      else {
        Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: data.message,
        });
      }
    })
 
};

  // ui create by js
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement("h1", null, "Auth App"), // null for not giving any id or class like attribute (Auth App) for heading written

    // create input feilds
    React.createElement("input", {
      placeholder: " User Name",
      type: "text",
     
      autoComplete: "off",
      onChange: (e) => setName(e.target.value),
    }),

    React.createElement("input", {
      placeholder: "Email",
      type: "email",
      
      autoComplete: "off",
      onChange: (e) => setEmail(e.target.value),
    }),

    React.createElement("input", {
      placeholder: "Password",
      type: "password",
      // value: password,
      autoComplete: "off",
      onChange: (e) => setPassword(e.target.value),
    }),

    React.createElement("button", { onClick: signUp }, "SignUp"),
    React.createElement("button", { onClick: login }, "Login"),
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App),
);
