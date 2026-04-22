# Contribution & Git Workflow

## Branching strategy

- `main`: production stable
- `dev`: integration branch
- `feat/<nom-feature>`: nouvelles fonctionnalités
- `bugfix/<nom-bug>`: corrections standard
- `hotfix/<nom-hotfix>`: corrections urgentes prod

## Commit convention

Utiliser des commits clairs et atomiques:

- `feat: add user filters`
- `fix: handle mysql startup race`
- `chore: update ci workflow`
- `docs: improve k8s setup`

## Merge policy

1. Ouvrir PR vers `dev`
2. CI verte obligatoire
3. Revue + squash merge
4. Promotion `dev` -> `main` via PR

## Local quality gate

Avant PR:

```bash
make local-ci
```
