# 02. State Management

**Status:** Completed

**Last Updated:** July 6, 2026

## Feature Purpose

Nestly needs to show the correct child’s information across the dashboard.

To make this possible, I created a shared state for the selected child so different components can stay connected and display consistent data.

---

## Goal

Create one source of truth for the selected child.

---

## Problem

Many components need access to the same child data.

If each component managed its own selected child state, the dashboard could show inconsistent information.

---

## My Approach

I stored the selected child state in the App component.

Then I passed the selected child and the update function down to child components using props.

This allows components like the Header, Child Selector, Dashboard, Child Overview, Stats Cards, and Charts to work with the same selected child data.

---

## Technical Decisions

I lifted the selected child state to the App component because App is the common parent of the dashboard components.

This keeps the selected child data centralized and easier to manage.

Instead of each component deciding which child is selected, the App component controls that state and shares it with the components that need it.

---

## Key Concepts

- useState
- Props
- Lifting State
- Single Source of Truth
- React Data Flow
- Parent-to-Child Communication

---

## Impact

When a parent selects a different child, the dashboard can update consistently.

This makes the app feel connected and prevents different parts of the UI from showing different child information.

---

## Reflection

State management helped me understand how React components communicate with each other.

Instead of thinking about each component separately, I started thinking about where data should live and which components need access to that data.

This made the project easier to reason about as the dashboard became more dynamic.

---

## Screenshot

The dashboard using shared selected child state across multiple components.

![State Management](../screenshots/state-management.png)
