```markdown
# startup-idea-validator Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you how to contribute to a TypeScript-based React project with a focus on consistent code style, file organization, and testing patterns. You'll learn the repository's naming conventions, import/export styles, and how to write and locate tests. While no automated workflows were detected, this guide suggests commands for common development tasks.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `ideaValidator.tsx`, `startupList.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { validateIdea } from './ideaValidator';
    ```

### Export Style
- Both **named** and **default exports** are used.
  - Named export:
    ```typescript
    export function validateIdea(idea: string): boolean { ... }
    ```
  - Default export:
    ```typescript
    export default StartupList;
    ```

### Commit Messages
- Freeform style, sometimes with prefixes.
- Average commit message length: ~101 characters.
- Example:
  ```
  Add initial validation logic for startup ideas and update UI to display results
  ```

## Workflows

### Development
**Trigger:** When starting new features or fixes  
**Command:** `/dev-start`

1. Create a new branch for your feature or fix.
2. Implement changes following the coding conventions.
3. Use relative imports and appropriate export styles.
4. Write or update tests as needed.
5. Commit changes with a clear, descriptive message.

### Testing
**Trigger:** Before pushing or merging code  
**Command:** `/test`

1. Locate test files matching the `*.test.*` pattern.
2. Run the test suite using your preferred test runner (framework is unspecified).
3. Ensure all tests pass before submitting a pull request.

### Code Review
**Trigger:** When submitting code for review  
**Command:** `/review`

1. Double-check code for adherence to naming, import, and export conventions.
2. Ensure commits are descriptive and clear.
3. Confirm all relevant tests are present and passing.

## Testing Patterns

- Test files follow the `*.test.*` naming pattern.
  - Example: `ideaValidator.test.ts`
- The specific testing framework is unknown, but tests are likely colocated with implementation files or in a `__tests__` directory.
- Write tests for new features and update existing tests as code changes.

## Commands
| Command    | Purpose                                      |
|------------|----------------------------------------------|
| /dev-start | Start a new development branch and workflow  |
| /test      | Run all tests in the repository              |
| /review    | Prepare code for review and check conventions|
```