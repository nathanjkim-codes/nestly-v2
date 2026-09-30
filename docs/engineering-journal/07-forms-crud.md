# 07. Forms & CRUD

**Status:** Completed  
**Last Updated:** September 2026

## Feature Purpose

Nestly allows parents to create, view, edit, and delete child information and records.

I implemented CRUD functionality for:

- Children
- Growth Records
- Sleep Records
- Feeding Records

---

## Goal

Build reusable CRUD patterns while keeping React state and the UI synchronized.

```text id="owesap"
Create → Add data
Read   → Display data
Update → Edit data
Delete → Remove data
```

---

## Children CRUD

### Create

When a user submits the Child Form, the new child is added to the existing `children` state.

```js id="b7pt3s"
const handleAddChild = (newChild) => {
  const newChildArray = [...children, newChild];

  setChildren(newChildArray);
  setIsChildFormOpen(false);
};
```

Data flow:

```text id="tpmll7"
Form
 ↓
newChild
 ↓
handleAddChild()
 ↓
new children array
 ↓
setChildren()
 ↓
UI updates
```

---

### Read

The Children Page reads from `children` state and displays the current children.

```text id="6c0y5g"
children state
      ↓
Children Page
      ↓
UI
```

When the state changes, React re-renders the page with the latest data.

---

### Update

When the user clicks Edit, I store the selected child in `editChild` and open the form.

```js id="vbtz8c"
const handleOpenEditChild = (child) => {
  setEditChild(child);
  setIsChildFormOpen(true);
};
```

The form uses the existing child's information to prefill its inputs.

When the form is submitted, I use `map()` to find the matching child by ID and replace it with the updated version.

```text id="nrc5yh"
Edit button
    ↓
editChild
    ↓
prefill form
    ↓
updated values
    ↓
map()
    ↓
find matching ID
    ↓
updated child
    ↓
setChildren()
    ↓
UI updates
```

After the update, I reset the edit state and close the form.

---

### Delete

Delete uses the child's ID to remove the correct child.

```js id="ukakxx"
const handleDeleteById = (id) => {
  setChildren((current) => current.filter((child) => child.id !== id));
};
```

Data flow:

```text id="y8h5mz"
Delete button
     ↓
child ID
     ↓
filter()
     ↓
new array without that child
     ↓
setChildren()
     ↓
UI updates
```

---

## CRUD Pattern I Learned

The same basic pattern is used throughout Nestly:

```text id="1cydbi"
CREATE
new data → new array → setState()

READ
state → component → UI

UPDATE
ID → map() → updated item → setState()

DELETE
ID → filter() → setState()
```

This pattern helped me build similar CRUD functionality for Growth, Sleep, and Feeding records.

---

## Technical Decisions

### IDs

I use IDs to identify which child or record should be updated or deleted.

### Immutable State Updates

Instead of directly changing React state, I create new arrays and objects using:

- Spread syntax for Create
- `map()` for Update
- `filter()` for Delete

### Reusable Forms

The same form can support both Create and Edit by checking whether an item is currently being edited.

---

## Data Flow

The main pattern across the CRUD features is:

```text id="9dyw3k"
User Action
    ↓
Event Handler
    ↓
Data Transformation
    ↓
State Update
    ↓
React Re-render
    ↓
Updated UI
```

---

## What I Learned

CRUD helped me connect several React concepts that I had previously learned separately:

- State
- Props
- Controlled forms
- Event handlers
- IDs
- `map()`
- `filter()`
- Spread syntax
- Re-rendering

The biggest lesson was learning to think about **data flow before writing code**.

Instead of only asking:

> What code should I write?

I started asking:

> Where does the data come from, which function changes it, and where does it go next?

---

## Next Step

At this stage, CRUD data is managed in React state.

The next step is moving the data through an API and eventually storing it in a database.

```text id="zq7t90"
Current:

Form → Handler → React State → UI


Next:

Form → fetch() → Express → Database
                        ↓
React State ← Response
      ↓
     UI
```

This transition is documented in `08-api-integration.md`.
