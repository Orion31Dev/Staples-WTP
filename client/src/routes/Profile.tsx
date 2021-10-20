import { TokenPayload } from 'google-auth-library';
import React from 'react';
import Tabs from '../components/Tabs';
import { getUserUnit } from '../unitData';
import { getUserInfo } from '../oauth/authUtils';
import '../styles/routes/Profile.scss';

interface ProfileProps {
  match: any;
}

enum ProfileTab {
  NONE, 
  UNIT,
}

interface ProfileState {
  tabIndex: number;
  user?: TokenPayload | null;
  userUnit?: any;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      tabIndex: ProfileTab.NONE,
      user: undefined,
      userUnit: undefined,
    };
  }

  componentDidMount() {
    getUserInfo().then(async (user) => {
      this.setState({ user, userUnit: await getUserUnit() });
    });
  }

  render() {
    if (!this.state.user) return this.NoAccessPage();

    return (
      <div className="section profile">
        <div
          className="title"
          onClick={() => {
            this.setState({ tabIndex: ProfileTab.NONE });
          }}
        >
          {this.state.user.name}'s Profile
        </div>
        <div className="unit">{this.state.userUnit.includes('unit') ? 'Unit ' + this.state.userUnit : this.state.userUnit}</div>
        <div className="tabs flex">
          {Tabs(Object.keys(ProfileTab), this.state.tabIndex, (tab: number) => this.setState({ tabIndex: tab }))}
        </div>
      </div>
    );
  }

  private NoAccessPage() {
    return (
      <div className="section profile">
        <div className="no-access">
          <div className="title">You are not logged in</div>
        </div>
      </div>
    );
  }
}

export async function HasAdminAccess() {
  let info = await getUserInfo();

  return (info && info.sub) === process.env.REACT_APP_ADMIN_SUB;
}
