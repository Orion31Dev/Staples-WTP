import React from 'react';
import FreeTimes from '../components/admin/FreeTimes';
import UnitSettings from '../components/admin/UnitSettings';
import Calendar from '../components/Calendar';
import Tabs from '../components/Tabs';
import { getUserInfo } from '../oauth/authUtils';
import '../styles/routes/Admin.scss';

interface AdminProps {
  match: any;
}

enum AdminTab {
  NONE,
  UNITS,
  CALENDAR,
}

const UnitTab = ['1', '2', '3', '4', '5', '6'];

interface AdminState {
  tabIndex: number;
  unitTabIndex: number;
  selectedDate?: Date;
  access: boolean;
}

export default class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    this.state = {
      tabIndex: AdminTab.NONE,
      unitTabIndex: 0,
      selectedDate: undefined,
      access: false,
    };
  }

  componentDidMount() {
    HasAdminAccess().then((a) => this.setState({ access: a }));
  }

  render() {
    if (!this.state.access) return this.NoAccessPage();

    return (
      <div className="section admin">
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: AdminTab.NONE });
          }}
        >
          Super Secret Admin Page (Top Secret)
        </div>
        <div className="tabs flex">
          {Tabs(Object.keys(AdminTab), this.state.tabIndex, (tab: number) => this.setState({ tabIndex: tab }))}
        </div>
        {this.state.tabIndex === AdminTab.UNITS && (
          <div>
            <div className="unit tabs flex">
              {Tabs(UnitTab, this.state.unitTabIndex, (tab: number) => this.setState({ unitTabIndex: tab }), false)}
            </div>
            <UnitSettings unitNum={UnitTab[this.state.unitTabIndex]} />
          </div>
        )}
        {this.state.tabIndex === AdminTab.CALENDAR &&
          (this.state.selectedDate ? (
              <FreeTimes back={() => this.setState({selectedDate: undefined})} day={this.state.selectedDate} />
          ) : (
            <Calendar onSelect={(d) => this.setState({ selectedDate: d })} />
          ))}
      </div>
    );
  }

  private NoAccessPage() {
    return (
      <div className="section admin">
        <div className="no-access">
          <div className="title">Go away, Trumbull 😡</div>
          <div className="sub">You don't have access to view this page. Try logging in?</div>
        </div>
      </div>
    );
  }
}

export async function HasAdminAccess() {
  let info = await getUserInfo();

  return (info && info.sub) === process.env.REACT_APP_ADMIN_SUB;
}
