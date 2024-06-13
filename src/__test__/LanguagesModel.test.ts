import { describe, test } from "vitest";
import { LanguagesModel } from "../LanguagesModel.ts";
import { resolve } from "path";
import {
  __dirname,
  languages,
  flatLanguagesContentExample,
  nestLanguagesContentExample,
  expectLanguagesModel,
} from "./helper.ts";

describe("LanguagesModel", () => {
  test("create the right model from flatLanguagesContent", () => {
    const languagesModel = new LanguagesModel({
      languages,
      languagesContent: flatLanguagesContentExample,
    });

    expectLanguagesModel(languagesModel);
  });

  test("create the right model from nestLanguagesContent", () => {
    const languagesModel = new LanguagesModel({
      languages,
      languagesContent: nestLanguagesContentExample,
    });

    expectLanguagesModel(languagesModel);
  });

  test("load languages from local folder and create the right model", () => {
    const languagesModel = LanguagesModel.loadFromFolder({
      folderPath: resolve(__dirname + "/i18n"),
      languages
    });

    expectLanguagesModel(languagesModel);
  });

  test("save languages to local folder", () => {
    const languagesModel = new LanguagesModel({
      languages,
      languagesContent: flatLanguagesContentExample,
    });

    const folderPath = resolve(__dirname + "/tmp/nestI18n");

    languagesModel.saveToFolder({ folderPath, type: "nest"});

    const languagesModel2 = LanguagesModel.loadFromFolder({
      folderPath,
      languages
    });

    expectLanguagesModel(languagesModel2);
  });

  test("save languages to local folder without omitted", async () => {
    const folderPath = resolve(__dirname + "/tmp/nestI18n")

    // 1) save normal data
    const languagesModel = new LanguagesModel({
      languages,
      languagesContent: flatLanguagesContentExample,
    });
    languagesModel.saveToFolder({ folderPath, type: "nest" });

    // 2) try to overwrite it with another data
    const newData = JSON.parse(JSON.stringify({ 
      ...flatLanguagesContentExample,
      ...{ en: { name: 'New Name' }}
    }))
    const languagesModel2 = new LanguagesModel({
      languages,
      languagesContent: newData,
    });
    languagesModel2.saveToFolder({ folderPath, type: "nest", omitLangs: ['en'] });

    const languagesModel3 = LanguagesModel.loadFromFolder({
      folderPath,
      languages,
    });

    expectLanguagesModel(languagesModel3);
  });
});
