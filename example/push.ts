import { GoogleSheetLanguagesModel } from "google-sheet-languages-model-2";
import { SHEET_ID, SHEET_TAB_NAME, languages, auth, folderPath } from "./config.ts";

const languagesModel = GoogleSheetLanguagesModel.loadFromFolder(
  folderPath,
  languages
);

const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
  sheetId: SHEET_ID,
  auth,
});

await googleSheetLanguagesModel.saveToGoogleSheet(SHEET_TAB_NAME, languagesModel);

console.log("push done");
