import { GoogleSheetLanguagesModel } from "google-sheet-languages-model-2";
import { SHEET_ID, SHEET_TAB_NAME, languages, auth, folderPath } from "./config.ts";

const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
  sheetId: SHEET_ID,
  auth,
});

const languagesModel = await googleSheetLanguagesModel.loadFromGoogleSheet(
  SHEET_TAB_NAME,
  languages
);

languagesModel.saveToFolder(folderPath, "nest");

console.log("pull done");
