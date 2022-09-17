'use babel';

import Suckey001View from './suckey001-view';
import { CompositeDisposable } from 'atom';

export default {

  suckey001View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.suckey001View = new Suckey001View(state.suckey001ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.suckey001View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'suckey001:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.suckey001View.destroy();
  },

  serialize() {
    return {
      suckey001ViewState: this.suckey001View.serialize()
    };
  },

  toggle() {
    console.log('Suckey001 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
