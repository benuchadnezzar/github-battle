var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

function Player (props) {
	return (

	)
}

Player.PropTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}
	componentDidMount () {
		var players = queryString.parse(this.props.location.search);

		api.battle([
			players.playerOneName,
			players.playerTwoName
		]).then(function (results) {
			if (results === null) {
				return this.setState(function () {
					return {
						error: 'Whoops, looks like there was an error. Check that both users exist on Github.',
						loading: false
					}
				});
			}
			this.setState(function () {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false
				}
			})
		}.bind(this));
	}
	render() {
		var winner = this.state.winner;
		var loser = this.state.loser;
		var error = this.state.error;
		var loading = this.state.loading;

		if (loading === true) {
			return <p>Loading</p>
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}
		return(
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile}
				/>
			</div>
		)
	}
}

module.exports = Results;