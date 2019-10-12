class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		this.state = config.initial;
		this.config = config;
		this.history = [];
		this.undoState = [];	
	} 
    /**
     * Returns active state.
     * @returns {String}
     */
	  
    getState() {
		 return this.state;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if(this.config.states[state]){
			this.history.push(this.state);
			this.state = state;
			this.undoState = [];
			return this.state;
		}
		else {
			throw Error("Error: state isn't exist");
		}
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		this.changeState(this.config.states[this.state].transitions[event]);
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.state = this.config.initial;
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		let specifiedEvent = [];
		if (event) {
			Object.keys(this.config.states).forEach(element => {
			if (this.config.states[element].transitions[event]) {
				specifiedEvent.push(element);
			}
			});
			return specifiedEvent;
		} 
		else {
			return Object.keys(this.config.states);
		}
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		 if (this.history.length == 0) {
			return false;
		}
		else{
			this.undoState.push(this.state);
			this.state = this.history.pop();
			return true;
		}
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		 if (this.undoState.length == 0) {
			return false;
		}
		else{
			this.state = this.undoState.pop();
			return true;
		}
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.history = [];
		this.undoState = [];
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
