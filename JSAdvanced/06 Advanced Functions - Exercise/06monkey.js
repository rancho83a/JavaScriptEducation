
function solution(command) {
    const operation = {
        upvote: () => this.upvotes++,
        downvote: () => this.downvotes++,
        score: () => {
            let str = 'new';
            let total = this.upvotes + this.downvotes;
            if (total < 10) {
                str = 'new';
            } else {

                if (this.upvotes / total > 0.66) {
                    str = 'hot';
                } else if (this.upvotes >= this.downvotes && total > 100) {
                    str = 'controversial'
                } else if (this.upvotes < this.downvotes) {
                    str = 'unpopular';
                }
            }

            res = [];
            let addVotes = 0;
            if ((this.upvotes + this.downvotes) > 50) {
                addVotes = Math.ceil(0.25 * Math.max(this.downvotes, this.upvotes));
            }
            res.push(this.upvotes + addVotes);
            res.push(this.downvotes + addVotes);
            res.push(res[0] - res[1]);
            res.push(str);
            return (res);
        }
    }
    return operation[command](this);

}


let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');        // (executed 50 times)
solution.call(post, 'downvote');
solution.call(post, 'downvote');

score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']
