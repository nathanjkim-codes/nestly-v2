# 02. State Management

**Status:** Completed  
**Last Updated:** July 6, 2026

## Feature Purpose

Nestly needs to show the correct child's information across the dashboard.

To make this possible, I created shared state for the selected child so that different components can stay connected and display consistent data.

---

## Goal

Create one source of truth for the selected child.

---

## Problem

Multiple components need access to the same selected child data.

If each component managed its own selected child state, different parts of the dashboard could become out of sync and display information for different children.

---

## My Approach

I stored the selected child state in the `App` component.

The `App` component acts as the common parent for the components that need access to the selected child.

I then passed the selected child data and the state update function down to child components using props.

This allows components such as the Header, Child Selector, Dashboard, Child Overview, Stats Cards, and Charts to work with the same selected child data.

---

## Data Flow

The selected child data flows from the parent component down to the components that need it.

```text
App
│
│ owns selectedChild state
│
├── Header
│    └── Child Selector
│
└── Dashboard
     ├── Child Overview
     ├── Stats Cards
     └── Charts
```

When the user selects another child:

```text
User selects child
        ↓
Child Selector
        ↓
state update function
        ↓
App updates selected child state
        ↓
React re-renders
        ↓
updated selected child flows down through props
        ↓
dashboard components display the new child's data
```

---

## Technical Decisions

I lifted the selected child state to the `App` component because `App` is the common parent of the components that need this information.

This gives Nestly one source of truth for which child is currently selected.

Instead of each component deciding independently which child is selected, the `App` component owns the state and shares the necessary data with its child components.

For the current size of Nestly, lifting state and passing data through props keeps the data flow explicit and relatively easy to trace.

As the application grows, I may need to reconsider how shared application state is organized if passing data through many component levels becomes difficult to maintain.

---

## Key Concepts

- `useState`
- Props
- Lifting State
- Single Source of Truth
- React Data Flow
- Parent-to-Child Communication
- State Ownership
- Re-rendering

---

## Impact

When a parent selects a different child, the shared state changes and React re-renders the components that depend on that data.

This allows the dashboard to update consistently and prevents different parts of the UI from displaying information for different children.

---

## What I Learned

The biggest lesson from this feature was that state should not automatically live in the component where it is displayed.

I first need to ask:

**Which components need this data?**

Then I can determine the closest appropriate common owner of that state.

I also learned to think about React features as a data flow:

```text
User Action
    ↓
Event Handler
    ↓
State Update
    ↓
React Re-render
    ↓
Props
    ↓
Updated UI
```

This became an important pattern for later Nestly features, especially forms and CRUD operations.

---

## Reflection

State management helped me understand how React components communicate with each other.

Instead of thinking about each component separately, I started thinking about:

- Where should this data live?
- Which component should be responsible for changing it?
- Which components need to receive it?
- What causes those components to re-render?

Thinking about state ownership and data flow made the project easier to reason about as the dashboard became more dynamic.

---

## Screenshot

The dashboard using shared selected child state across multiple components.

![State Management](../screenshots/state-management.png)
