import express from "express";
import { registerUser, loginUser } from "./router/userRoutes";
import { createFolder, viewAllUserFolder } from "./router/folderRoutes";
import { createFile, viewAllUserFiles } from "./router/filesRoutes";
import { viewAllSystems } from "./router/systemsRoutes";

const router = express()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/registerFolder', createFolder)
router.post('/registerFile', createFile)
router.get('/viewFolders', viewAllUserFolder)
router.get('/viewFiles', viewAllUserFiles)
router.get('/viewSystem', viewAllSystems)

export default router