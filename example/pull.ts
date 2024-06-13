import { GoogleSheetLanguagesModel } from "../src/GoogleSheetLanguagesModel.ts";
import { SHEET_ID, SHEET_TAB_NAME, languages, auth, folderPath } from "./config.ts";

const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
  sheetId: SHEET_ID,
  auth,
});

const languagesModel = await googleSheetLanguagesModel.loadFromGoogleSheet({
  sheetTitle: SHEET_TAB_NAME,
  languages,
});

languagesModel.saveToFolder({ 
  folderPath, 
  type: "nest", 
});

console.log("pull done");
