# Project Agents

This workspace has specialized agents for different development tasks.

## Available Agents

### feature-planner

**Specialization**: GitHub issue analysis and task breakdown
**Use when**: GitHub issue analysis, feature breakdown, task planning, project kanban management, breaking down large issues into smaller tasks, planning development work, accessing GitHub project boards

Analyzes GitHub issues and features, understands codebase context, and breaks down complex work into actionable tasks that can be delegated to specialist agents.

### ui-developer

**Specialization**: React/TypeScript frontend implementation  
**Use when**: React component development, TypeScript frontend implementation, UI feature development, styling and layout, React hooks and state management, component testing, frontend GitHub issue implementation

Specialized in implementing React/TypeScript UI features following project conventions, integrating with existing components and design systems.

### test-fixer

**Specialization**: React Testing Library and Jest test fixing
**Use when**: fixing broken tests, test failures, React Testing Library issues, Jest configuration, TypeScript test errors, routing tests, mocking problems, test pipeline failures

Specialized in React/TypeScript/Vite/Jest test environments.

### pipeline-doctor

**Specialization**: CI/CD pipeline diagnostics and delegation
**Use when**: CI/CD pipeline failures, build errors, deployment issues, test pipeline problems, GitHub Actions failures, npm script errors

Diagnoses issues and delegates to appropriate specialist agents.

### github-actions-specialist

**Specialization**: GitHub Actions workflow authoring and debugging
**Use when**: GitHub Actions workflow authoring, workflow debugging, failed run investigation, job log analysis, permissions issues, matrix strategy updates, caching, artifacts, and release automation

Specialized in creating, reviewing, and fixing GitHub Actions workflows while keeping CI/CD behavior reliable and maintainable.

### test-runner

**Specialization**: Test execution and failure delegation  
**Use when**: running tests, test suite execution, validating test changes, checking test coverage

Runs tests and delegates any failures to the test-fixer agent.

## Usage Examples

- **"Analyze this GitHub issue: https://github.com/..."** → Invokes `feature-planner` for task breakdown
- **"Break down this feature into tasks"** → Invokes `feature-planner` for planning
- **"Implement this UI feature: [GitHub URL]"** → Invokes `ui-developer` for React implementation
- **"Create a new component for [purpose]"** → Invokes `ui-developer` for component development
- **"Fix my failing tests"** → Invokes `test-fixer` directly
- **"My pipeline is failing"** → Invokes `pipeline-doctor` who diagnoses and delegates
- **"Debug this GitHub Actions workflow"** → Invokes `github-actions-specialist` for workflow analysis or authoring
- **"Run the test suite"** → Invokes `test-runner` who executes and handles failures

## Agent Relationships

```
feature-planner → ui-developer (for frontend implementation tasks)
feature-planner → test-fixer (for test-related tasks)
feature-planner → pipeline-doctor (for CI/CD tasks)
feature-planner → github-actions-specialist (for workflow automation tasks)
ui-developer → test-fixer (for component testing)
pipeline-doctor → test-fixer (for test failures)
github-actions-specialist → pipeline-doctor (for broader CI/CD diagnosis)
github-actions-specialist → test-fixer (for test failures surfaced by CI)
test-runner → test-fixer (for test failures)
```

The `feature-planner` orchestrates high-level planning and delegates implementation tasks to specialist agents like `ui-developer`.
