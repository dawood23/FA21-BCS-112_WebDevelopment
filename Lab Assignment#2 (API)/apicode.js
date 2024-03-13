
$(document).ready(function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayStories(data);
        },
    });
});

function displayStories(stories) {
    var container = $('#stories-container');
    
    $.each(stories, function(index, story) {
        var storyHtml = '<div class="story">';
        storyHtml += '<h2> UserId: '+story.userId+'</h2>';
        storyHtml += '<h2> id: '+story.userId+'</h2>';
        storyHtml += '<h2>' + story.title + '</h2>';
        storyHtml += '<p>' + story.body + '</p>';
        storyHtml += '</div>';
        storyHtml+= '<hr/>'
        
        container.append(storyHtml);
    });
}

