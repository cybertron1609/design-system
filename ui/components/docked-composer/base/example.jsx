// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React from 'react';
import { ButtonIcon } from 'ui/components/button-icons/base/example';
import { Menu, MenuList, MenuItem } from 'ui/components/menus/dropdown/example';
import { Modal, ModalContent } from 'ui/components/modals/base/example';
import { Lookup } from 'ui/components/lookups/base/example';
import SvgIcon from 'app_modules/ui/svg-icon';
import classNames from 'classnames';
import _ from 'lodash';

const dialogHeadingId = 'modal-heading-id-1';
const dialogBodyId = 'modal-content-id-1';

const composers = [{
  'entity': 'email',
  'title': 'Agenda for next week'
}, {
  'entity': 'call',
  'title': 'Lei Chan'
}, {
  'entity': 'task',
  'title': 'August 14 Meeting Notes'
}];

///////////////////////////////////////////
// Partial(s)
///////////////////////////////////////////

const Footer = props =>
  <div className="slds-col--bump-left slds-text-align--right">
    <button className="slds-button slds-button--brand">Action</button>
  </div>;

export let DockedComposerPanel = props =>
  <section
    className={classNames('slds-docked-composer slds-grid slds-grid--vertical', props.className, props.dialogClosed ? 'slds-is-closed' : null)}
    role={ !props.nestedDialog ? 'dialog' : null}
    aria-labelledby={ !props.nestedDialog ? dialogHeadingId : null }
    aria-describedby={ !props.nestedDialog ? dialogBodyId : null }
  >
    <header className="slds-docked-composer__header slds-grid slds-shrink-none" aria-live="assertive">
      <div className="slds-media slds-media--center slds-size--1-of-1 slds-no-space">
        <div className="slds-media__figure slds-m-right--x-small">
          <span className="slds-icon_container">
            <SvgIcon
              className="slds-icon slds-icon--small slds-icon-text-default"
              sprite="standard"
              symbol={ props.headerSymbol || 'call' }
            />
          </span>
        </div>
        <div className="slds-media__body">
          { props.dialogClosed ?
            <span className="slds-assistive-text">Minimized</span>
          : null }
          <h2 className="slds-truncate" id={ dialogHeadingId } title={ props.header || 'Header' }>{ props.header || 'Header' }</h2>
        </div>
      </div>
      <div className="slds-col--bump-left slds-shrink-none">
        <ButtonIcon
          className="slds-button--icon"
          symbol="minimize_window"
          assistiveText="Minimize Composer Panel"
          title="Minimize window"
        />
        <ButtonIcon
          className="slds-button--icon"
          symbol="expand_alt"
          assistiveText="Expand Composer Panel"
          title="Expand Composer"
        />
        <ButtonIcon
          className="slds-button--icon"
          symbol="close"
          assistiveText="Close Composer Panel"
          title="Close"
        />
      </div>
    </header>
    <div className={classNames('slds-docked-composer__body', props.bodyClassName)} id={ dialogBodyId }>
      { props.children }
    </div>
    { props.footer ?
      <footer className={classNames('slds-docked-composer__footer slds-shrink-none', props.footerClassName)}>
        { props.footer }
      </footer>
    : null }
  </section>;

let ComposerOverflowMenu = props =>
  <div className="slds-docked-composer slds-docked-composer--overflow">
    <button className="slds-button slds-button--icon slds-docked-composer--overflow__button" aria-haspopup="true">
      <SvgIcon className="slds-button__icon" sprite="utility" symbol="standard_objects" />
      <span className="slds-text-body--small slds-m-left--xx-small">3 <span className="slds-assistive-text">other docked composer panels</span></span>
    </button>

    <Menu className="slds-dropdown--left slds-dropdown--bottom slds-dropdown--medium slds-nubbin--bottom-left">
      <MenuList className="slds-dropdown--length-with-icon-7">
        { _.times(composers.length, i =>
          <MenuItem key={ i }>
            <span className={'slds-icon_container slds-icon-standard-' + composers[i].entity + ' slds-m-right--x-small'}>
              <SvgIcon className="slds-icon slds-icon--small" sprite="standard" symbol={ composers[i].entity } />
              <span className="slds-assistive-text">{ composers[i].entity }</span>
            </span>
            { composers[i].title }
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  </div>;

///////////////////////////////////////////
// Export
///////////////////////////////////////////

export const Context = props =>
  <div style={{ height: '500px', minWidth: '615px', overflowX: 'auto' }}>
    {props.children}
  </div>;

export default (
  <div className="slds-docked_container">
    <DockedComposerPanel
      className="slds-is-open"
      footer={ <Footer /> }
    >
      <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
    </DockedComposerPanel>
  </div>
);

export let states = [
  {
    id: 'single-composer-open',
    label: 'Open',
    element:
      <div className="slds-docked_container">
        <DockedComposerPanel
          className="slds-is-open"
          footer={ <Footer /> }
        >
          <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
        </DockedComposerPanel>
      </div>
  },
  {
    id: 'single-composer-focused',
    label: 'Focused',
    element:
      <div className="slds-docked_container">
        <DockedComposerPanel
          className="slds-is-open slds-has-focus"
          footer={ <Footer /> }
        >
          <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
        </DockedComposerPanel>
      </div>
  },
  {
    id: 'single-composer-closed',
    label: 'Closed',
    element:
      <div className="slds-docked_container">
        <DockedComposerPanel
          dialogClosed
          footer={ <Footer /> }
        >
          <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
        </DockedComposerPanel>
      </div>
  },
  {
    id: 'single-composer-closed-focused',
    label: 'Closed Focused',
    element:
      <div className="slds-docked_container">
        <DockedComposerPanel
          className="slds-has-focus"
          dialogClosed
          footer={ <Footer /> }
        >
          <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
        </DockedComposerPanel>
      </div>
  },
  {
    id: 'single-composer-popout',
    label: 'Popout',
    element:
    <div>
      <Modal className="slds-docked-composer-modal" aria-labelledby={dialogHeadingId} aria-describedby={dialogBodyId}>
        <ModalContent>
          <DockedComposerPanel footer={ <Footer /> } nestedDialog>
            <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
          </DockedComposerPanel>
        </ModalContent>
      </Modal>
      <div className="slds-backdrop slds-backdrop--open"></div>
    </div>
  },
  {
    id: 'multiple-composer-overflow',
    label: 'With Overflow Menu',
    element:
      <div className="slds-docked_container">
        <ComposerOverflowMenu />
        <DockedComposerPanel
          className="slds-is-open"
          footer={ <Footer /> }
        >
          <div className="slds-align--absolute-center">Docked Composer Panel Body <br /> This area consumes the feature</div>
        </DockedComposerPanel>
      </div>
  }
];

export let examples = [
  {
    id: 'task',
    label: 'Log a Task',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-docked-composer__body--form"
        header="New Task"
        headerSymbol="task"
        footer={ <button className="slds-button slds-button--brand slds-col--bump-left">Save</button> }
      >
        <fieldset className="slds-form slds-form--compound">
          <legend className="slds-assistive-text">Log new task</legend>
          <div className="form-element__group">
            <div className="slds-form-element__row">
              <div className="slds-form-element">
                <label className="slds-form-element__label" htmlFor="text-input-01">Subject</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" type="text" id="text-input-01" />
                </div>
              </div>
            </div>
            <div className="slds-form-element__row">
              <div className="slds-form-element slds-size--1-of-2">
                <label className="slds-form-element__label" htmlFor="text-input-02">Assigned To</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" type="text" id="text-input-02" />
                </div>
              </div>
              <div className="slds-form-element slds-size--1-of-2">
                <label className="slds-form-element__label" htmlFor="text-input-03">Due Dates</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" type="text" id="text-input-03" />
                </div>
              </div>
            </div>
            <div className="slds-form-element__row">
              <Lookup className="slds-size--1-of-2" polymorphic label="Name" placeholder="Search Leads" />
              <Lookup className="slds-size--1-of-2" polymorphic label="Name" placeholder="Search Accounts" />
            </div>
          </div>
        </fieldset>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-queued',
    label: 'Voice - Queued',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - Connecting..."
        footer={<button className="slds-button slds-button--destructive slds-size--1-of-1">End Call</button>}
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            Connecting...
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-ringing',
    label: 'Voice - Ringing',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - Dialing..."
        footer={ <button className="slds-button slds-button--destructive slds-size--1-of-1">End Call</button> }
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            Dialing...
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-connected',
    label: 'Voice - Connected',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        header="Lei Chan - Call in Progress"
        footer={ <button className="slds-button slds-button--destructive slds-col--bump-left">End Call</button> }
      >
        <div className="slds-docked-composer__lead">
          <div className="slds-media">
            <div className="slds-media__figure">
              <span className="slds-avatar slds-avatar--medium">
                <img
                  alt=""
                  src="/assets/images/avatar2.jpg"
                  title="Lei Chan avatar"
                />
              </span>
            </div>
            <div className="slds-media__body">
              <p className="slds-text-heading--medium">Lei Chan</p>
              <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
                <li className="slds-item">VP of Sales</li>
                <li className="slds-item ">Acme Corporation</li>
              </ul>
            </div>
          </div>
          <p className="slds-col--bump-left slds-text-heading--large">5:37</p>
        </div>
        <div className="slds-docked-composer__toolbar">
          <ButtonIcon
            className="slds-button--icon-border-filled slds-button--icon-small"
            symbol="unmuted"
            assistiveText="Mute Yourself"
            title="Mute Yourself"
            aria-pressed="false"
          />
        </div>
        <label className="slds-assistive-text" htmlFor="composer-text-input-1">Take notes</label>
        <textarea id="composer-text-input-1" className="slds-docked-composer__input slds-input--bare slds-text-longform slds-grow" placeholder="Jot down notes here..." />
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-cancelled',
    label: 'Voice - Cancelled',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - Cancelling..."
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            Cancelling...
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-busy',
    label: 'Voice - Busy',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - Busy"
        footer={[
          <button className="slds-button slds-button--neutral slds-size--1-of-2" key={_.uniqueId('follow-up-')}>Follow-Up Later</button>,
          <button className="slds-button slds-button--brand slds-size--1-of-2" key={_.uniqueId('call-again-')}>Call Again</button>
        ]}
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            Busy
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-failed',
    label: 'Voice - Call Failed',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - Call Failed"
        footer={[
          <button className="slds-button slds-button--neutral slds-size--1-of-2" key={_.uniqueId('follow-up-')}>Edit Phone Number</button>,
          <button className="slds-button slds-button--brand slds-size--1-of-2" key={_.uniqueId('call-again-')}>Call Again</button>
        ]}
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            Call Failed
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-no-answer',
    label: 'Voice - No Answer',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center"
        header="Lei Chan - No Answer"
        footer={[
          <button className="slds-button slds-button--neutral slds-size--1-of-2" key={_.uniqueId('follow-up-')}>Follow-Up Later</button>,
          <button className="slds-button slds-button--brand slds-size--1-of-2" key={_.uniqueId('call-again-')}>Call Again</button>
        ]}
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            No Answer
          </p>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-call-finished',
    label: 'Voice - Call Finished',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        header="Lei Chan - Call Finished"
        footer={ <button className="slds-button slds-button--brand slds-col--bump-left">Finish Notes</button> }
      >
        <div className="slds-docked-composer__lead">
          <div className="slds-media">
            <div className="slds-media__figure">
              <span className="slds-avatar slds-avatar--medium">
                <img
                  alt=""
                  src="/assets/images/avatar2.jpg"
                  title="Lei Chan avatar"
                />
              </span>
            </div>
            <div className="slds-media__body">
              <p className="slds-text-heading--medium">Lei Chan</p>
              <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
                <li className="slds-item">VP of Sales</li>
                <li className="slds-item ">Acme Corporation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slds-docked-composer__toolbar">
          <ButtonIcon
            className="slds-button--icon-border-filled slds-button--icon-small"
            symbol="unmuted"
            assistiveText="Mute Yourself"
            title="Mute Yourself"
            aria-pressed="false"
          />
        </div>
        <label className="slds-assistive-text" htmlFor="composer-text-input-1">Take notes</label>
        <textarea id="composer-text-input-1" className="slds-docked-composer__input slds-input--bare slds-text-longform slds-grow" placeholder="Jot down notes here..." />
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-call-incoming',
    label: 'Voice - Call Incoming',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-align--absolute-center slds-size--1-of-1"
        header="Lei Chan - Incoming Call..."
        footer={ <button className="slds-button slds-button--brand slds-col--bump-left">Finish Notes</button> }
      >
        <div className="slds-text-align--center slds-align-middle">
          <span className="slds-avatar slds-avatar--large">
            <img
              alt=""
              src="/assets/images/avatar2.jpg"
              title="Lei Chan avatar"
            />
          </span>
          <h3 className="slds-text-heading--large">Lei Chan</h3>
          <ul className="slds-list--horizontal slds-has-dividers--right slds-text-body--small">
            <li className="slds-item">VP of Sales</li>
            <li className="slds-item ">Acme Corporation</li>
          </ul>
          <p className="slds-text-heading--medium slds-m-top--medium">
            (416) 555-1234
          </p>
        </div>
        <div className="slds-p-horizontal--x-small slds-text-align--left slds-size--1-of-1">
          <h3 className="slds-m-bottom--x-small">Recent Activity</h3>
          <ul className="slds-has-dividers--around-space">
            <li className="slds-item slds-theme--shade slds-grid">
              <span className="slds-icon_container slds-icon-standard-task slds-m-right--x-small">
                <SvgIcon className="slds-icon slds-icon--small" sprite="standard" symbol="task" />
                <span className="slds-assistive-text">Task</span>
              </span>
              Discussed New Pricing Models
              <span className="slds-col--bump-left">Yesterday</span>
            </li>
            <li className="slds-item slds-theme--shade slds-grid">
              <span className="slds-icon_container slds-icon-standard-email slds-m-right--x-small">
                <SvgIcon className="slds-icon slds-icon--small" sprite="standard" symbol="email" />
                <span className="slds-assistive-text">Email</span>
              </span>
              Re: Updated Proposals
              <span className="slds-col--bump-left">4 Hours Ago</span>
            </li>
            <li className="slds-item slds-theme--shade slds-grid">
              <span className="slds-icon_container slds-icon-standard-note slds-m-right--x-small">
                <SvgIcon className="slds-icon slds-icon--small" sprite="standard" symbol="note" />
                <span className="slds-assistive-text">Note</span>
              </span>
              Discuss Slides for Nov EBC
              <span className="slds-col--bump-left">2 Days Ago</span>
            </li>
          </ul>
        </div>
      </DockedComposerPanel>
    </div>
  },
  {
    id: 'voice-composer-call-logged',
    label: 'Voice - Log a Call',
    element:
    <div className="slds-docked_container">
      <DockedComposerPanel
        className="slds-is-open"
        bodyClassName="slds-docked-composer__body--form"
        header="Lei Chan"
        footer={ <button className="slds-button slds-button--brand slds-col--bump-left">Save</button> }
      >
        <fieldset className="slds-form slds-form--compound">
          <legend className="slds-assistive-text">Log a call</legend>
          <div className="form-element__group">
            <div className="slds-form-element__row">
              <div className="slds-form-element">
                <label className="slds-form-element__label" htmlFor="text-input-01">Subject</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" type="text" id="text-input-01" />
                </div>
              </div>
            </div>
            <div className="slds-form-element__row">
              <div className="slds-form-element">
                <label className="slds-form-element__label" htmlFor="textarea-input-01">Comments</label>
                <div className="slds-form-element__control">
                  <textarea className="slds-textarea" id="textarea-input-01" />
                </div>
              </div>
            </div>
            <div className="slds-form-element__row">
              <Lookup className="slds-size--1-of-2" polymorphic label="Name" placeholder="Search Leads" />
              <Lookup className="slds-size--1-of-2" polymorphic label="Name" placeholder="Search Accounts" />
            </div>
          </div>
        </fieldset>
      </DockedComposerPanel>
    </div>
  }
];