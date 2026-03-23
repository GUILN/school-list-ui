# Project Agents

This workspace has specialized agents for different development tasks.

## Available Agents

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

- **"Fix my failing tests"** → Invokes `test-fixer` directly
- **"My pipeline is failing"** → Invokes `pipeline-doctor` who diagnoses and delegates
- **"Run the test suite"** → Invokes `test-runner` who executes and handles failures

## Agent Relationships

```
pipeline-doctor → test-fixer (for test failures)
test-runner → test-fixer (for test failures)
```

The `test-fixer` agent is the specialist that other agents delegate to for test-related problems.
