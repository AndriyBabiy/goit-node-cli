import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsAll = await listContacts();
      return console.log(contactsAll);

    case "get":
      const contactOne = await getContactById(id);
      return console.log(contactOne);

    case "add":
      // ... name email phone
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      // ... id
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Andriy Babiy",
//   email: "me@andriybabiy.com",
//   phone: "012 345 6789",
// });
// invokeAction({ action: "remove", id: "JD8MONpcufiM7B8XG0TUd" });
