import type { PlopTypes } from "@turbo/gen"

const generator = (plop: PlopTypes.NodePlopAPI) =>
  plop.setGenerator("init", {
    actions: [
      (answers) => {
        if (!answers || typeof answers !== "object" || !("name" in answers)) {
          throw new Error("generator:init -> missing package name")
        }

        if (
          "name" in answers &&
          typeof answers.name === "string" &&
          answers.name.startsWith("@xeeno/")
        ) {
          answers.name = answers.name.replace("@xeeno/", "")
        }

        if (
          typeof answers.name !== "string" ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(answers.name)
        ) {
          throw new Error(
            "Invalid package name. Use lowercase letters, numbers, and hyphens only."
          )
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
