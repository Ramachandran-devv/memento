/**
 * The Memento interface defines the methods that the caretaker can use to access
 * the state of the text editor.
 */
// Capture and restore an object's internal state
/**
 * The ConcreteMemento class implements the Memento interface to store the state
 * of the text editor.
 */
var ConcreteTextEditorMemento = /** @class */ (function () {
    function ConcreteTextEditorMemento(state) {
        this.state = state;
    }
    ConcreteTextEditorMemento.prototype.getState = function () {
        return this.state;
    };
    return ConcreteTextEditorMemento;
}());
/**
 * The Originator class represents the text editor. It allows users to make
 * changes to the document and save snapshots of its state.
 */
var TextEditor = /** @class */ (function () {
    function TextEditor(content) {
        this.content = content;
    }
    TextEditor.prototype.getContent = function () {
        return this.content;
    };
    TextEditor.prototype.setContent = function (content) {
        this.content = content;
    };
    /**
     * Saves the current state of the text editor to a memento.
     */
    TextEditor.prototype.saveToMemento = function () {
        return new ConcreteTextEditorMemento(this.content);
    };
    /**
     * Restores the state of the text editor from a memento.
     */
    TextEditor.prototype.restoreFromMemento = function (memento) {
        this.content = memento.getState();
    };
    return TextEditor;
}());
/**
 * The Caretaker class manages the history of snapshots (mementos) of the text
 * editor's state. It allows users to undo or redo changes by restoring the
 * editor's state from these snapshots.
 */
var Caretaker = /** @class */ (function () {
    function Caretaker(textEditor) {
        this.textEditor = textEditor;
        this.mementos = [];
        this.currentIndex = -1;
    }
    /**
     * Saves the current state of the text editor to a new memento and updates
     * the index.
     */
    Caretaker.prototype.save = function () {
        var memento = this.textEditor.saveToMemento();
        this.mementos.push(memento);
        this.currentIndex = this.mementos.length - 1;
    };
    /**
     * Restores the text editor's state to the previous state by loading the
     * previous memento from the history.
     */
    Caretaker.prototype.undo = function () {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            var memento = this.mementos[this.currentIndex];
            this.textEditor.restoreFromMemento(memento);
        }
    };
    /**
     * Restores the text editor's state to the next state by loading the next
     * memento from the history.
     */
    Caretaker.prototype.redo = function () {
        if (this.currentIndex < this.mementos.length - 1) {
            this.currentIndex++;
            var memento = this.mementos[this.currentIndex];
            this.textEditor.restoreFromMemento(memento);
        }
    };
    return Caretaker;
}());
// Example usage
var textEditor = new TextEditor("Initial content");
var caretaker = new Caretaker(textEditor);
// User makes changes and caretaker saves snapshots of the editor's state
caretaker.save();
textEditor.setContent("Updated content");
caretaker.save();
textEditor.setContent("More changes");
caretaker.save();
textEditor.setContent("Even more changes");
console.log("Current content:", textEditor.getContent());
// User undoes changes
caretaker.undo();
console.log("Undone content:", textEditor.getContent());
caretaker.undo();
console.log("Undone content:", textEditor.getContent());
// User redoes changes
caretaker.redo();
console.log("Redone content:", textEditor.getContent());
caretaker.redo();
console.log("Redone content:", textEditor.getContent());
//# sourceMappingURL=memento.js.map