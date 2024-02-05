const users = { // Yes, an object!  Keep it as one
  "Amit": "Amit", // The keys let you check to see if the user is logged in
  "Bao": "Bao", // the values don't really matter, here we reuse the username, but it could be `true`
};

const messages = [ // Notice: An array of objects
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

// Below uses destrucuring
function addMessage({ sender, text }) {
  // Automatically add the user if not already present in the 'users' object
  if (!users[sender]) {
    users[sender] = sender;
  }
  // Add the message to the 'messages' array
  messages.push({ sender, text });
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

