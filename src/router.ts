import express from "express";
import {
  formCreate,
  nameCreate,
  deleteUser,
  updateUser,
  viewUser,
  checkingEmail,
  checkingPassword,
} from "./router/userRoutes";
import {
  createFolder,
  viewAllUserFolder,
  deleteFolder,
  updateFolder,
} from "./router/folderRoutes";
import {
  createFile,
  deleteFiles,
  updateFiles,
  viewAllUserFiles,
} from "./router/filesRoutes";
import { viewAllSystems } from "./router/systemsRoutes";

const router = express();

router.post("/registerName", nameCreate);
router.post("/registerForm", formCreate)

router.post("/loginEmail", checkingEmail);
router.post("/loginPassword", checkingPassword)

router.get("/viewUser", viewUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

router.post("/registerFolder", createFolder);
router.get("/viewFolders", viewAllUserFolder);
router.put("/updateFolder", updateFolder);
router.delete("/deleteFolder", deleteFolder);

router.post("/registerFile", createFile);
router.get("/viewFiles", viewAllUserFiles);
router.put("/updateFiles", updateFiles);
router.delete("/deleteFiles", deleteFiles);

router.get("/viewSystem", viewAllSystems);

export default router;
