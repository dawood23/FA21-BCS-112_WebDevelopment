function stories(){
    $.ajax({
        url: 'https://usmanlive.com/wp-json/api/stories',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayStories(data);
        },
    });
}

let check=false;
let storyID;

function displayStories(stories) {
    var container = $('#stories-container');
    container.empty();

    $.each(stories, function(index, story) {
        var storyHtml = '<div class="story m-4">';
        storyHtml += '<h2> id: '+story.id+'</h2>';
        storyHtml += '<h2>' + story.title + '</h2>';
        storyHtml += '<p>' + story.content + '</p>';
        storyHtml += '<button class="btn btn-success m-2" onclick="editStory(' + story.id + ',\'' + story.title + '\',\'' + story.content + '\')">Update</button>';
        storyHtml += '<button class="btn btn-danger" onclick="deleteStory('+story.id+')">Delete</button>';         
        storyHtml += '</div>';
        storyHtml+= '<hr/>'

        container.append(storyHtml);
    });
}

function editStory(id,title,content){
    document.getElementById("createTitle").value = title;
    document.getElementById("createContent").value = content;
    check=true;
    storyID=id;
}

function createStory() {
    var title = $('#createTitle').val();
    var content = $('#createContent').val();

    if (title.trim() === '' || content.trim() === '') {
        alert('Please enter title and content');
        return;
    }
    
    if (check == true) {
        check=false;
        $.ajax({
            url: "https://usmanlive.com/wp-json/api/stories/" + storyID,
            method: "PUT",
            data:({ 
                 title,
                 content
            }),
            success: function () {
                alert('Story updated successfully');
                $('#createTitle').val('');
                $('#createContent').val('');
                stories();
            },
            error: function (error) {
                console.error("Error updating story:", error);
            }
        });
    } 
    else{
    $.ajax({
        url: 'https://usmanlive.com/wp-json/api/stories',
        method: 'POST',
        data: {
            title: title,
            content: content
        },
        success: function() {
            alert('Story created successfully:');
            $('#createTitle').val('');
            $('#createContent').val('');
            
            stories();
        },
        error: function() {
            console.error('Error creating story');
        }
    });
}
}


function deleteStory(id) {
    
    $.ajax({
        url: 'https://usmanlive.com/wp-json/api/stories/' + id,
        method: 'DELETE',
        success: function() {
            console.log('Story with ID ' + id + ' deleted successfully.');
            stories();
        },
        error: function() {
            console.error('Error deleting story');
        }
    });
}

$(document).ready(function() {
    stories();
    $('#createBtn').click(function(event) {
        event.preventDefault();
        createStory();
    });
});