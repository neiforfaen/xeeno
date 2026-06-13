import type { PlopTypes } from "@turbo/gen"

const generator = (plop: PlopTypes.NodePlopAPI) =>
  plop.setGenerator("init", {
    actions: [
      (answers) => {
        if (
          "name" in answers &&
          typeof answers.name === "string" &&
          answers.name.startsWith("@xeeno/")
        ) {
          answers.name = answers.name.replace("@xeeno/", "")
        }
        return "Config sanitized"
      },
      {
        path: "packages/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs",
        type: "add",
      },
      {
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
        type: "add",
      },
    ],
    description: "Generate a new package for the Monorepo",
    prompts: [
      {
        message:
          "What is the name of the package? (You can skip the `@xeeno/` prefix)",
        name: "name",
        type: "input",
      },
    ],
  })

export default generator
