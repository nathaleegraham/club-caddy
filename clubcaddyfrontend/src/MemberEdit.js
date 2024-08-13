import {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class MemberEdit extends Component {

    emptyItem = {
        firstName: '',
        lastName: '',
        memberId: '',
        cartSpace:'',
        hasCartLease: '',
        clubSpace: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.memberId !== 'new'){
                const member = await (await fetch(`/member/${this.props.match.params.memberId}`)).json();
                this.setState({item: member});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const firstName = target.firstName;
        const lastName = target.lastName;
        const memberId = target.memberId;
        const cartSpace = target.cartSpace;
        const hasCartLease = target.hasCartLease;
        const clubSpace = target.cartSpace;
        let item = {...this.state.item};
        item[firstName] = value;
        item[lastName] = value;
        item[memberId] = value;
        item[cartSpace] = value;
        item[hasCartLease] = value;
        item[clubSpace] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/members' + (item.memberId ? '/' + item.memberId : ''), {
            method: (item.memberId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/members');
    }

    render() {
        const {item} =this.state;
        const title = <h2>{item.id ? 'Edit Member' : 'Add Member'}</h2>

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" firstName="firstName" id="firstName" value={item.firstName || ""}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" lastName="lastName" id="lastName" value={item.lastName || ""}
                               onChange={this.handleChange} autoComplete="lastName"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="memberId">Member ID</Label>
                        <Input type="text" memberId="memberId" id="memberId" value={item.memberId || ""}
                               onChange={this.handleChange} autoComplete="memberId"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="firstName">Cart Space</Label>
                        <Input type="text" cartSpace="cartSpace" id="cartSpace" value={item.cartSpace || ""}
                               onChange={this.handleChange} autoComplete="cartSpace"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="hasCartLease">Cart Lease</Label>
                        <Input type="text" hasCartLease="hasCartLease" id="hasCartLease" value={item.hasCartLease || ""}
                               onChange={this.handleChange} autoComplete="hasCartLease"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="clubSpace">Club Space</Label>
                        <Input type="text" clubSpace="clubSpace" id="clubSpace" value={item.clubSpace || ""}
                               onChange={this.handleChange} autoComplete="clubSpace"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" type={Link} to="/members">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(MemberEdit);