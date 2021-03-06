import { observable, action } from 'mobx';
import { contestsStore } from 'store';

class LeaderboardStore {
	@observable
	leaderboard = [];

	@observable currentPage = 1;
	@observable postsPerPage = 10;

	@action fetchLeaderboard = slug => {
		fetch(`/api/${slug}/leaderboard?page=1&count=10000`, {
			credentials: 'same-origin'
		})
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					contestsStore.setTitle(data.data.contest.title);
					contestsStore.setSlug(data.data.contest.slug);
					this.leaderboard = data.data.leaderboard;
				}
			});
	};

	@action setCurrentPage = pageNumber => {
		this.currentPage = pageNumber;
	};
}

export default new LeaderboardStore();
