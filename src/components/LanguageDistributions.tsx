/*
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pie Chart with Labels</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <style>
      .pie-chart {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: relative;
        transform: rotate(-90deg);
      }
      .pie-chart .slice {
        width: 100%;
        height: 100%;
        position: absolute;
        clip: rect(0, 100px, 200px, 0);
      }
      .pie-chart .slice .bar {
        width: 100%;
        height: 100%;
        border-radius: 60%;
        position: absolute;
        clip: rect(0, 200px, 200px, 100px);
      }
    </style>
  </head>
  <body class="bg-gray-900">
    <div class="flex min-h-screen flex-col items-center justify-center">
      <div class="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 p-6 shadow">
        <h3 class="text-lg font-medium leading-6 text-gray-200">Language Distribution</h3>
        <div class="mt-4 flex items-center">
          <div class="pie-chart">
            <div class="slice" style="transform: rotate(0deg);">
              <div class="bar" style="border: 8px solid #4F46E5; background-color: transparent; transform: rotate(36deg);"></div>
            </div>
            <div class="slice" style="transform: rotate(36deg);">
              <div class="bar" style="border: 8px solid #22C55E; background-color: transparent; transform: rotate(54deg);"></div>
            </div>
            <div class="slice" style="transform: rotate(90deg);">
              <div class="bar" style="border: 8px solid #F97316; background-color: transparent; transform: rotate(108deg);"></div>
            </div>
            <div class="slice" style="transform: rotate(198deg);">
              <div class="bar" style="border: 8px solid #9333EA; background-color: transparent; transform: rotate(162deg);"></div>
            </div>
          </div>
          <div class="ml-6">
            <div class="flex items-center">
              <div class="mr-2 h-4 w-4 rounded-full bg-blue-600"></div>
              <span class="text-sm font-medium text-gray-400">JavaScript / TypeScript - 36%</span>
            </div>
            <div class="mt-2 flex items-center">
              <div class="mr-2 h-4 w-4 rounded-full bg-green-600"></div>
              <span class="text-sm font-medium text-gray-400">Python - 27%</span>
            </div>
            <div class="mt-2 flex items-center">
              <div class="mr-2 h-4 w-4 rounded-full bg-yellow-600"></div>
              <span class="text-sm font-medium text-gray-400">Java / Apex - 54%</span>
            </div>
            <div class="mt-2 flex items-center">
              <div class="mr-2 h-4 w-4 rounded-full bg-purple-600"></div>
              <span class="text-sm font-medium text-gray-400">HTML & CSS - 81%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

*/
