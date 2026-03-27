export const BLOGS_TECH = [
  {
    title: 'Building a Docker-Sandboxed Code Execution Engine from Scratch',
    excerpt: 'How I designed isolated multi-language execution using Docker containers, resource limits, and stdin/stdout piping in a Node.js backend.',
    tags: ['#Docker', '#Node.js', '#Systems'],
    time: '10 min',
    date: 'Feb 2026',
    color: 'linear-gradient(135deg,#e8b63a22,#1a1510)',
    icon: '⊡',
    featured: true,
    content: `
# Building a Docker-Sandboxed Code Execution Engine

When building my **Code & Feedback Platform**, the biggest backend challenge was figuring out how to run untrusted, user-submitted code safely. You can't just run \`eval()\` or execute a Python script natively on your server — one malicious payload or an infinite \`while(true)\` loop could crash the entire system.

The solution? **Docker Sandboxing.**

## Why Docker?
Docker provides a lightweight, isolated environment (a container) for applications. By spinning up an ephemeral container for every code submission, I could ensure that user code runs in a vacuum. If a user tries to access the filesystem or runs an exhaustive memory leak, they only crash their temporary container — not my host server.

## The Execution Pipeline

Here is how the pipeline works in Node.js:

1. **Payload Reception**: The user submits C++, Python, or JavaScript code via the frontend editor.
2. **File Generation**: The Node.js server writes this code to a temporary file (e.g., \`solution.cpp\`).
3. **Compilation (if compiled)**: For C++, I use a \`child_process.exec\` command to compile the file into an executable payload using \`g++\`.
4. **Container Instantiation**: I spawn a Docker container using the specific language image (e.g., \`python:3.9-slim\`).
5. **Execution & Limits**: This is the crucial part. I use Docker flags to strictly limit resources:
   - \`--memory="256m"\`: Prevents out-of-memory attacks.
   - \`--cpus="1.0"\`: Prevents CPU monopolization.
   - \`timeout 5s\`: Kills the container if the code results in an infinite loop (Time Limit Exceeded - TLE).

## Handling stdin / stdout
To verify the output, I pipe the problem's predefined test cases into the container's standard input. The container processes the input and pipes the result back through standard output. 

I then compare the stdout against the expected output. If they match completely, it's an **Accepted (AC)**! If not, it's a **Wrong Answer (WA)**.

## Conclusion
Building this sandboxed engine stripped away the magic of platforms like LeetCode and HackerRank. I learned that what feels like "magic" on the frontend is actually just a highly orchestrated, secure OS-level transaction on the backend.
    `
  },
  {
    title: 'Implementing BullMQ + Redis for Async Job Queues — A Deep Dive',
    excerpt: 'Step-by-step breakdown of building a production-ready async submission pipeline using BullMQ worker queues and Redis pub/sub.',
    tags: ['#Redis', '#BullMQ', '#Backend'],
    time: '8 min',
    date: 'Jan 2026',
    color: 'linear-gradient(135deg,#4ade8022,#0e1a0e)',
    icon: '⇶',
    content: `
# Decoupling Systems: Why Async Queues Matter

During the development of my **Code & Feedback Platform**, I hit a major bottleneck: synchronously evaluating code took too long. 

When a user hit "Submit", the Express server handled the request, saved the code, compiled it, spun up a Docker container, awaited the output, compared it, and *then* sent an HTTP response. If 50 users submitted code at once, my API effectively staggered and died.

I needed an asynchronous worker queue. I turned to **Redis** and **BullMQ**.

## The Architecture Evolution

**Before (Synchronous)**:
\`Client -> API Server -> Heavy Docker Execution -> Client Timeout\`

**After (Asynchronous)**:
\`Client -> API Server -> Redis Queue (BullMQ)\`
*(Meanwhile, a separate Worker Node picks jobs off the queue -> Docker Execution -> DB Update -> WebSocket pushing to Client)*

## How BullMQ Saved the Day
BullMQ is a blazing-fast message queue built on top of Redis. Here's how I implemented it:

1. **The Producer**: When a submission hits the API, I create a job:
   \`\`\`javascript
   const submissionQueue = new Queue('code-submissions', { connection: redisClient });
   await submissionQueue.add('evaluate', { userId, code, language, problemId });
   \`\`\`
   The API immediately replies \`202 Accepted\` to the user, freeing up the HTTP connection.

2. **The Consumer (Worker)**: I run a separate Node.js process dedicated *only* to executing code.
   \`\`\`javascript
   const worker = new Worker('code-submissions', async job => {
     // Heavy Docker execution happens here
     const result = await runSandboxedCode(job.data);
     await saveToDatabase(result);
   });
   \`\`\`

## The Result
By decoupling the heavy lifting from the API server, the application became immensely resilient. The API now effortlessly handles traffic spikes — incoming jobs just queue up in Redis memory, and the worker(s) handle them sequentially at maximum physical hardware capacity. 

This fundamentally shifted my perspective from building monolithic APIs to building distributed, event-driven systems.
    `
  },
  {
    title: 'How Topological Sort Solved My Dependency Graph Problem',
    excerpt: 'Breaking down the graph-based dependency resolver I built for the Schedule It project — and why topological sort was the only right answer.',
    tags: ['#DSA', '#Graphs', '#Algorithms'],
    time: '7 min',
    date: 'Dec 2025',
    color: 'linear-gradient(135deg,#b8cc4222,#0e1a0a)',
    icon: '⊛',
    content: `
# Applied Graphs: Topological Sort in Action

We learn Data Structures and Algorithms to clear interviews, but eventually, you realize DSA is actually just the vocabulary for solving real systems engineering bugs. 

This became explicitly clear when I was building **Schedule It**, my CPU scheduling simulator.

## The Problem
For a process scheduling simulator, I allowed users to define "Dependencies" — e.g., Process C cannot start until Process A and Process B finish. 

When calculating the final Gantt chart execution order, I couldn't just throw them in a Priority Queue. I needed a way to dynamically resolve these complex dependency chains and flag any impossible cyclical dependencies (e.g., A needs B, B needs C, C needs A).

## Recognizing the Pattern
I looked at the dependency list. 
Process A -> Process C.
Process B -> Process C.

*Wait a second,* I thought. *This is a Directed Acyclic Graph (DAG).* 
And deciding the linear execution order of nodes in a DAG is the exact definition of **Topological Sort**.

## The Implementation (Kahn's Algorithm)
Instead of inventing a complicated recursive checker, I modeled the processes as a graph:
1. Every process is a Node.
2. Every dependency is a Directed Edge.
3. I calculated the **in-degree** (number of prerequisites) for every process.

I initialized a queue with all processes that had an in-degree of 0 (no prerequisites). As those "executed", I reduced the in-degrees of their dependent neighbors. If a neighbor's in-degree hit 0, it was added to the queue.

## Catching the Cycle
Kahn's Algorithm inherently detects cycles. If the final resolved sorted list didn't contain exactly \`N\` processes, I instantly knew a cyclical dependency existed because cyclical nodes never reach an in-degree of 0!

By applying a classic graph traversal algorithm I originally learned on LeetCode, I wrote a hyper-efficient, bug-free dependency resolver in under 20 lines of code. Theoretical DSA isn't useless — it's the ultimate backend cheat code.
    `
  },
];

export const BLOGS_PERSONAL = [
  {
    title: '500 Problems and What I Actually Learned',
    excerpt: 'The real lessons from grinding 500+ DSA problems on LeetCode and GFG — beyond just knowing the patterns.',
    tags: ['#DSA', '#Growth', '#Consistency'],
    time: '6 min',
    date: 'Jan 2026',
    color: 'linear-gradient(135deg,#e8b63a22,#1a0e00)',
    icon: '▧',
    featured: true,
    content: `
# 500 Problems Later

Hitting **500 solved problems** on platforms like LeetCode and GeeksForGeeks (and reaching a contest rating of 1590) was a massive personal milestone. But the numbers aren't what actually matter.

When you solve your first 50 problems, you're just memorizing syntax and struggling with basic array manipulation. By 100, you're learning standard algorithms. But around 300+, something shifts. You stop memorizing solutions, and you start recognizing structural constraints.

## The Mental Shift
The most valuable thing 500 problems gave me wasn't the ability to invert a binary tree; it was **algorithmic intuition**.

When I look at a problem now, I don't guess. I look at the constraints:
- If \`N = 10^5\`, the solution *must* be \`O(N)\` or \`O(N log N)\`. Maybe an optimized Greedy approach, Sliding Window, or Binary Search on Answer.
- If \`N = 20\`, it screams Backtracking or Bitmask DP.

## Consistency is the Real Skill
Competitive programming is brutally humbling. You will spend three hours staring at a "Wrong Answer on Test Case #48". You will drop rating in contests because you misread one crucial constraint.

Grinding through 500 problems required me to sit with failure almost every single day. That persistence — the willingness to break a monolithic, impossible-looking problem down into base cases, state transitions, and recurrence relations — translates directly into how I build full-stack systems today.

Debugging a BullMQ Redis connection error feels easy when you've survived debugging an off-by-one error in a 3D Dynamic Programming matrix.
    `
  },
  {
    title: 'Being a CS Student Who Builds in Production',
    excerpt: 'How I bridge the massive gap between what college teaches and what the industry actually needs — while still being a student.',
    tags: ['#Student', '#Career', '#Building'],
    time: '5 min',
    date: 'Dec 2025',
    color: 'linear-gradient(135deg,#4ade8022,#0a0e00)',
    icon: '→',
    content: `
# The Gap Between Theory and Reality

As a Computer Science engineering student, college provides an excellent theoretical foundation: Automata Theory, Operating Systems, Database Normalization protocols. 

But there is a glaring delta between passing an OS exam and actually wiring up a production environment. 

## Moving Past To-Do Apps
In my early semesters, I fell into tutorial hell. I built the standard REST APIs and basic React frontends. It felt good, but it didn't feel like *engineering*.

My goal shifted from "building apps" to "building systems that don't constantly crash."
Instead of just sending a standard Express JSON response, I wanted to know:
- How does this handle 10,000 concurrent requests? 
- What happens if the container restarts?
- Is this database indexed for Read-Heavy or Write-Heavy loads?

## Enter Hackathons & Open Source
Participating in high-pressure environments like the **ISRO Hackathon** forced me to execute under ungodly deadlines. 
When you only have 36 hours, you can't afford to debate which state management library is mathematically superior — you have to establish a durable mental model, slice the architecture down to its MVP, and write code that *ships*.

Being a student means you have the freedom to fail in public without risking a company's revenue. Building production-grade side projects (like a custom code execution engine) bridges the gap faster than any lecture ever could.
    `
  },
  {
    title: 'Why I Chose DSA Before Frameworks — And Would Do It Again',
    excerpt: 'The decision that changed my entire trajectory as a developer. Strong fundamentals vs. framework fluency — there is a right answer.',
    tags: ['#DSA', '#Opinion', '#Learning'],
    time: '5 min',
    date: 'Nov 2025',
    color: 'linear-gradient(135deg,#b8cc4222,#001005)',
    icon: '◎',
    content: `
# Fundamentals Over Frameworks

When I started coding, the hype around specific frameworks was deafening. Every week, a new meta-framework or frontend state library promised to revolutionize the web.

I made a deliberate choice early on: **Ignore the noise. Master the fundamentals first.**

## Frameworks Expire, Algorithms Persist
React hooks might change. Node.js might get usurped by Go or Rust. But a Binary Search Tree traverses the exact same way it did 30 years ago, and it will traverse the exact same way 30 years from now.

I dedicated hundreds of hours to LeetCode and competitive programming before ever touching complex state management. I wanted my brain wired to think about time and space complexity natively.

## The Payoff
When I eventually pivoted to Full Stack development, the transition was incredibly fast. 
Frameworks are just wrappers around core engineering problems. 
- Why does React DOM reconciliation matter? Because tree diffing algorithms are expensive.
- Why optimize SQL queries? Because nested loop joins become \`O(N^2)\` catastrophes.

By putting DSA first, I didn't just learn *how* to use tools — I understood *why* the tools were built that way in the first place. Treat frameworks as transient tools. Treat algorithms as your core toolkit.
    `
  },
];
