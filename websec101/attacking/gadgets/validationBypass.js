function cheatValidation(user) {
  const cheater = { ...user };
  let adminAttempts = 0;
  Object.defineProperty(cheater, "isAdmin", {
    get() {
      adminAttempts++;
      return adminAttempts === 3;
    },
  });
  Object.defineProperty(cheater, "email", {
    get() {
      const stack = new Error().stack;
      if(stack.includes("sendImportantEmail")) {
        throw new Error("Access denied");
      }
      return user.email;
    },
  });
  return cheater;
}

// Type validation function
function validateType(value, expectedType) {
  if (typeof expectedType === "function") {
    return value instanceof expectedType;
  }
  return typeof value === expectedType;
}

// Object shape validation function
function validateObjectShape(obj, schema) {
  for (const [key, expectedType] of Object.entries(schema)) {
    if (!(key in obj)) {
      throw new Error(`Missing property: ${key}`);
    }
    if (!validateType(obj[key], expectedType)) {
      throw new Error(
        `Invalid type for ${key}: expected ${
          expectedType.name || expectedType
        }, got ${typeof obj[key]}`
      );
    }
  }
  return true;
}

function sendRegularEmail(user) {
  try {
    console.log("Sending regular email");
    console.log("  '-> to " + user.email);
  } catch (error) {
    console.error("Failed to send regular email:", error.message);
  }
}

function sendImportantEmail(user) {
  try {
    console.log("Sending IMPORTANT email");
    console.log("  '-> to " + user.email);
  } catch (error) {
    console.error("Failed to send IMPORTANT email:", error.message);
  }
}

// Example usage
const userSchema = {
  name: "string",
  age: "number",
  email: "string",
  isAdmin: "boolean",
  createdAt: Date,
};

const user1 = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  isAdmin: false,
  createdAt: new Date(),
};

const user2 = cheatValidation(user1);

console.log("Validating user object:");
validateObjectShape(user1, userSchema);
validateObjectShape(user2, userSchema);

console.log("checking if user2 is an admin", user2.isAdmin);
console.log("checking if user2 is an admin", user2.isAdmin);
console.log("checking if user2 is an admin", user2.isAdmin);

sendRegularEmail(user2);
sendImportantEmail(user2);
sendRegularEmail(user2);
