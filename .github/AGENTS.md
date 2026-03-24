# Project Agents

This workspace has specialized agents for different development tasks.

## Available Agents

### feature-planner

**Specialization**: GitHub issue analysis and task breakdown
**Use when**: GitHub issue analysis, feature breakdown, task planning, project kanban management, breaking down large issues into smaller tasks, planning development work, accessing GitHub project boards

Analyzes GitHub issues and features, understands codebase context, and breaks down complex work into actionable tasks that can be delegated to specialist agents.

### test-fixer

**Specialization**: React Testing Library and Jest test fixing
**Use when**: fixing broken tests, test failures, React Testing Library issues, Jest configuration, TypeScript test errors, routing tests, mocking problems, test pipeline failures

Specialized in React/TypeScript/Vite/Jest test environments.

### pipeline-doctor

**Specialization**: CI/CD pipeline diagnostics and delegation
**Use when**: CI/CD pipeline failures, build errors, deployment issues, test pipeline problems, GitHub Actions failures, npm script errors

Diagnoses issues and delegates to appropriate specialist agents.

### test-runner

**Specialization**: Test execution and failure delegation  
**Use when**: running tests, test suite execution, validating test changes, checking test coverage

Runs tests and delegates any failures to the test-fixer agent.

## Usage Examples

- **"Analyze this GitHub issue: https://github.com/..."** → Invokes `feature-planner` for task breakdown
- **"Break down this feature into tasks"** → Invokes `feature-planner` for planning
- **"Fix my failing tests"** → Invokes `test-fixer` directly
- **"My pipeline is failing"** → Invokes `pipeline-doctor` who diagnoses and delegates
- **"Run the test suite"** → Invokes `test-runner` who executes and handles failures

## Agent Relationships

```
feature-planner → test-fixer (for test-related tasks)
feature-planner → pipeline-doctor (for CI/CD tasks)
feature-planner → other agents (for specialized implementation)
pipeline-doctor → test-fixer (for test failures)
test-runner → test-fixer (for test failures)
```

The `feature-planner` orchestrates high-level planning and delegates implementation tasks to specialist agents.
