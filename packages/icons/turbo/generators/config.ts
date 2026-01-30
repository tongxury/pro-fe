import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    // A simple generator to add a new React component to the internal UI library
    plop.setGenerator("icon-component", {
        description: "Adds a new react component",
        prompts: [
            // {
            //     type: 'checkbox',
            //     name: 'type',
            //     choices: ['filled', 'line'],
            //     message: 'What is the type of the icon?',
            // },
            {
                type: "input",
                name: "name",
                validate(input: any) {
                    if (!input) {
                        return "file name is required";
                    }
                    if (!(input.endsWith("filled") || input.endsWith("line"))) {
                        return "file name must match the format: {name}_line or {name}_filled";
                    }
                    return true;
                },
                message: "What is the name of the icon? (lower case)"
            },
            {
                type: "input",
                name: "viewBoxSize",
                default: "30",
                validate(input: any) {
                    if (!input) {
                        return "view box is required";
                    }
                    if (!(parseInt(input) > 0)) {
                        return "view box must be a number";
                    }

                    return true;
                },
                message: "What is the svg viewBox size of the icon?"
            },
            {
                type: "confirm",
                name: "confirm",
                message: "please replace the svg content yourself"
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/{{pascalCase name}}.tsx",
                templateFile: "templates/component.hbs"
            },
            {
                type: "add",
                path: "src/{{pascalCase name}}.ts",
                templateFile: "templates/type.d.hbs"
            },
            // {
            //     type: 'append',
            //     path: 'package.json',
            //     pattern: /"exports": {(?<insertion>)/g,
            //     template: '    "./{{pascalCase name}}": "./src/{{pascalCase name}}.tsx",',
            // },
            {
                type: "append",
                path: "src/types.d.ts",
                template: ' | "{{pascalCase name}}" '
            }
        ]
    });
}
