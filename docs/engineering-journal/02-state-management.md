# 02. State Management

**Status:** Completed (Frontend)

**Last Updated:** October 13, 2026

## Feature Purpose

Nestly allows parents to manage multiple children, track daily records, and view information across different pages.

To manage these interactions, I used React state to keep the user interface updated and organized.

---

## Goal

Manage shared data and local component state efficiently while keeping the application easy to maintain.

---

## Problem

Different parts of the application need different types of state.

For example:

- The Dashboard and record pages need access to the selected child's information.
- Forms need to manage user input.
- Modals need to track whether they are open or closed.
- Edit forms need to know which record is being edited.
- The Analytics page needs to track the selected date range.

Keeping all these states in one component would make the application harder to maintain.

---

## My Approach

I organized state based on where it is needed.

### 1. Shared State

I used React's `useState` in the App component to manage shared child data.

Examples:

- `children` — Stores child data.
- `selectedChildId` — Tracks the currently selected child.

I used props and React Router's `useOutletContext` to share data with components and nested pages.

This helps different pages use consistent child information.

### 2. Form State

I used local state to manage user input in forms.

Examples:

- `dateInput`
- `timeInput`
- `typeInput`
- `amountInput`
- `noteInput`

Each state stores a value entered by the user.

When the user types into an input, the corresponding state updates.

### 3. Modal State

I used boolean state to control whether forms and modals are visible.

Examples:

- `isOpen`
- `isModalOpen`
- `isChildFormOpen`
- `isFeedingFormOpen`
- `isGrowthFormOpen`
- `isSleepFormOpen`

These states help control when a modal opens or closes.

### 4. Edit State

I used state to track which child or record is being edited.

Examples:

- `editChild`
- `editFeedingRecord`
- `editGrowthRecord`
- `editSleepRecord`

These states are initially set to `null`.

When the user selects a record to edit, the selected record can be stored in state and passed to the form.

### 5. Filter and Date Range State

I used state to manage date filters and analytics selections.

Examples:

- `dateRange` — Stores the selected Analytics date range.
- `fromDate` — Stores the beginning of a date filter.
- `toDate` — Stores the end of a date filter.

When these values change, the application can update which records are displayed.

### 6. Quick Add State

I used state to manage quick-add interactions.

Examples:

- `selectedQuickAdd` — Tracks the selected quick-add action.
- `isModalOpen` — Controls the quick-add modal visibility.

This helps the application determine which form to display based on the user's action.

---

## Technical Decisions

I decided to separate shared state from local component state.

Shared child data is managed in a common parent component because multiple pages need access to it.

Form input state stays within the relevant form because other pages do not need to manage those temporary input values.

Modal visibility and editing state are managed by the components responsible for those interactions.

I also used `null` to represent when no record is selected for editing, and boolean values to represent open or closed UI states.

This approach helps avoid unnecessary state sharing and keeps component responsibilities clear.

---

## Key Concepts

- React `useState`
- Shared State
- Local State
- Controlled Inputs
- Lifting State Up
- Props
- React Router `useOutletContext`
- Single Source of Truth
- Immutable State Updates
- Conditional Rendering
- React Re-rendering

---

## Impact

The application can manage multiple interactions without placing all state in one component.

Parents can select children, enter records, open and close forms, edit existing information, and filter records.

Keeping state close to where it is needed makes components easier to understand and maintain.

---

## Reflection

Implementing state management across Nestly helped me understand that not every state belongs in the App component.

I learned to distinguish between shared data, temporary form input, modal visibility, selected edit records, and filters.

I also learned that state placement is an important architectural decision in React.

As the application grew, separating state by responsibility made the data flow easier to understand.

---

## Screenshot

The dashboard and record pages using React state to manage user interactions.

![State Management](../screenshots/state-management.png)
