
class TaskScheduler {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    // 1. Sort tasks by start time
    sortByStartTime(list = this.tasks) {
        return [...list].sort((a, b) => a.startTime - b.startTime);
    }

    // 2. Group tasks by priority
    groupByPriority() {
        const grouped = new Map([
            ["High", []],
            ["Medium", []],
            ["Low", []]
        ]);

        for (const task of this.tasks) {
            if (!grouped.has(task.priority)) {
                grouped.set(task.priority, []);
            }

            grouped.get(task.priority).push(task);
        }

        return Object.fromEntries(grouped);
    }

    // 3. Detect overlapping tasks
    detectOverlaps() {
        const sortedTasks = this.sortByStartTime();
        const overlaps = [];

        for (let i = 0; i < sortedTasks.length; i++) {
            for (let j = i + 1; j < sortedTasks.length; j++) {

                // No later task can overlap if it starts
                // at or after the current task ends.
                if (sortedTasks[j].startTime >= sortedTasks[i].endTime) {
                    break;
                }

                overlaps.push([
                    sortedTasks[i],
                    sortedTasks[j]
                ]);
            }
        }

        return overlaps;
    }

    // 4. Estimate memory usage
    estimateMemoryUsage() {
        const approximateSizePerTask = 100;
        return this.tasks.length * approximateSizePerTask;
    }
}


// Example task list
const tasks = [
    {
        name: "Study JavaScript",
        startTime: 9,
        endTime: 11,
        priority: "High"
    },
    {
        name: "Complete Homework",
        startTime: 10,
        endTime: 12,
        priority: "Medium"
    },
    {
        name: "Exercise",
        startTime: 13,
        endTime: 14,
        priority: "Low"
    },
    {
        name: "Read a Book",
        startTime: 10,
        endTime: 10.5,
        priority: "High"
    },
    {
        name: "Project Work",
        startTime: 15,
        endTime: 17,
        priority: "Medium"
    }
];


// Create scheduler
const scheduler = new TaskScheduler(tasks);

// Test all functions
console.log("Sorted Tasks:");
console.log(scheduler.sortByStartTime());

console.log("Tasks Grouped by Priority:");
console.log(scheduler.groupByPriority());

console.log("Overlapping Tasks:");
console.log(scheduler.detectOverlaps());

console.log("Estimated Memory Usage:");
console.log(scheduler.estimateMemoryUsage(), "bytes");
