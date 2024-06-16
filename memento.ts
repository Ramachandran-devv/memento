/**
 * The Memento interface defines the methods that the caretaker can use to access
 * the state of the text editor.
 */
// Capture and restore an object's internal state

interface TextEditorMemento {
    getState(): string;
  }
  
  /**
   * The ConcreteMemento class implements the Memento interface to store the state
   * of the text editor.
   */
  class ConcreteTextEditorMemento implements TextEditorMemento {
    private state: string;
  
    constructor(state: string) {
      this.state = state;
    }
  
    getState(): string {
      return this.state;
    }
  }
  
  /**
   * The Originator class represents the text editor. It allows users to make
   * changes to the document and save snapshots of its state.
   */
  class TextEditor {
    private content: string;
  
    constructor(content: string) {
      this.content = content;
    }
  
    getContent(): string {
      return this.content;
    }
  
    setContent(content: string): void {
      this.content = content;
    }
  
    /**
     * Saves the current state of the text editor to a memento.
     */
    saveToMemento(): TextEditorMemento {
      return new ConcreteTextEditorMemento(this.content);
    }
  
    /**
     * Restores the state of the text editor from a memento.
     */
    restoreFromMemento(memento: TextEditorMemento): void {
      this.content = memento.getState();
    }
  }
  
  /**
   * The Caretaker class manages the history of snapshots (mementos) of the text
   * editor's state. It allows users to undo or redo changes by restoring the
   * editor's state from these snapshots.
   */
  class Caretaker {
    private mementos: TextEditorMemento[] = [];
    private currentIndex: number = -1;
  
    constructor(private textEditor: TextEditor) {}
  
    /**
     * Saves the current state of the text editor to a new memento and updates
     * the index.
     */
    public save(): void {
      const memento = this.textEditor.saveToMemento();
      this.mementos.push(memento);
      this.currentIndex = this.mementos.length - 1;
    }
  
    /**
     * Restores the text editor's state to the previous state by loading the
     * previous memento from the history.
     */
    public undo(): void {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        const memento = this.mementos[this.currentIndex];
        this.textEditor.restoreFromMemento(memento);
      }
    }
  
    /**
     * Restores the text editor's state to the next state by loading the next
     * memento from the history.
     */
    public redo(): void {
      if (this.currentIndex < this.mementos.length - 1) {
        this.currentIndex++;
        const memento = this.mementos[this.currentIndex];
        this.textEditor.restoreFromMemento(memento);
      }
    }
  }
  
  // Example usage
  const textEditor = new TextEditor("Initial content");
  const caretaker = new Caretaker(textEditor);
  
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