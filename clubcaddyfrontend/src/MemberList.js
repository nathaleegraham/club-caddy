import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {members: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/members')
            .then(response => response.json())
            .then(data => this.setState({members: data}));
    }

    async remove(memberId) {
        await fetch(`/members/${memberId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) .then(() => {
            let updatedMembers =
                [...this.state.members].filter(i => i.memberId !== memberId);
                    this.setState({members: updatedMembers});
        })
    }

    render() {
        const {members, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const memberList = members.map(member => {
            return <tr key={member.memberId}>
                <td style={{whiteSpace: 'nowrap'}}>
                    {member.firstName} {member.lastName}
                </td>
                <td>{member.memberId}</td>
                <td>{member.cartSpace}</td>
                <td>{member.hasCartLease}</td>
                <td>{member.clubSpace}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm"
                        color="primary" tag={Link} to={"/members/" + members.memberId}>Edit</Button>
                        <Button size="sm"
                                color="danger" onClick={() =>
                                this.remove(member.memberId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/members/new">Add Member</Button>
                    </div>
                    <h3>Members</h3>
                    <Table className="mt-4">
                        <thread>
                            <tr>
                                <th width="30%">First Name</th>
                                <th width="30%">Last Name</th>
                                <th width="30%">Member ID</th>
                                <th width="30%">Cart Space</th>
                                <th width="30%">Cart Lease</th>
                                <th width="30%">Club Space</th>
                                <th width="30%">Actions</th>
                            </tr>
                        </thread>
                        <tbody>
                        {memberList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MemberList;