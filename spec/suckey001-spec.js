'use babel';

import Suckey001 from '../lib/suckey001';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Suckey001', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('suckey001');
  });

  describe('when the suckey001:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.suckey001')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'suckey001:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.suckey001')).toExist();

        let suckey001Element = workspaceElement.querySelector('.suckey001');
        expect(suckey001Element).toExist();

        let suckey001Panel = atom.workspace.panelForItem(suckey001Element);
        expect(suckey001Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'suckey001:toggle');
        expect(suckey001Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.suckey001')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'suckey001:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let suckey001Element = workspaceElement.querySelector('.suckey001');
        expect(suckey001Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'suckey001:toggle');
        expect(suckey001Element).not.toBeVisible();
      });
    });
  });
});
