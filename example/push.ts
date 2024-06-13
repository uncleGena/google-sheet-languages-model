import { GoogleSheetLanguagesModel } from "../src/GoogleSheetLanguagesModel.ts";
import { LanguagesModel } from "../src/LanguagesModel.ts";
import { SHEET_ID, SHEET_TAB_NAME, languages, auth, folderPath } from "./config.ts";


// 1) pull first without default locale

const googleSheetLanguagesModelPull = new GoogleSheetLanguagesModel({
  sheetId: SHEET_ID,
  auth,
});

const languagesModelPull = await googleSheetLanguagesModelPull.loadFromGoogleSheet({
  sheetTitle: SHEET_TAB_NAME,
  languages,
});

languagesModelPull.saveToFolder({
  folderPath,
  type: "nest",
  omitLangs: ['en'],
});

// 2) push fresh langs

const languagesModel = LanguagesModel.loadFromFolder({
  folderPath,
  languages,
});

const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
  sheetId: SHEET_ID,
  auth,
});

await googleSheetLanguagesModel.saveToGoogleSheet(SHEET_TAB_NAME, languagesModel);

console.log("push done");
