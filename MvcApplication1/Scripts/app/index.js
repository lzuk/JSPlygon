function Task(data) {
    this.title = ko.observable(data.Title);
    this.isDone = ko.observable(data.IsDone);
    this.guid = null;
}

function TaskListViewModel() {
    // Data
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function () {
        return ko.utils.arrayFilter(self.tasks(), function (task) { return !task.isDone(); });
    });

    // Operations
    self.addTask = function () {
        var data = { "title": self.newTaskText(), "isDone": false };
        var freshTask = new Task(data);
        self.tasks.push(freshTask);


        $.ajax({
            type: "post", url: "/api/task/Post",
            success: function(data) {
                //alert(data); //server response (GUID or sth)
            },
            data: { "title": self.newTaskText(), "isDone": false },
            accept: 'application/json'
        });

        self.newTaskText("");
    };
    self.removeTask = function (task) { self.tasks.remove(task); };

    // Load initial state from server, convert it to Task instances, then populate self.tasks
    self.updateFromServer = $.getJSON("/api/task", function (allData) {
        var mappedTasks = $.map(allData, function (item) { return new Task(item); });
        self.tasks(mappedTasks);
    });
}

VM.first = new TaskListViewModel;
ko.applyBindings(VM.first);