# MobileAccessibility
Mobile Accessibility Tiny Tool for Software Engineering CIS 375

This website enables users to track their accessibility development progress through a checklist of standardized guidelines categories. They can check off boxes from different priorities, with Priority 1 being the most essential guidelines and Priority 3 being "good to have." Once a user is done checking the boxes, they can click "submit" and their final "score" is calculated. This score is out of a maximum of 50 points, which means the user has high accessibility in the context of a mobile app. 

In addition to the score, a breakdown by priorities is provided to the user to understand how their score was impacted by their choices in priorities. This is displayed as a graph. 

Finally, recommendations based on unchecked checkboxes are generated through an interface using the OpenAI API running on a backend server. These are specific to user response. Please be patient with the score as it loads since we are calling an external API.

We hope you enjoy our TinyTool!


Libraries Used: 
- Material Design Lite: https://getmdl.io/
- JQuery: https://jquery.com/
- Chart.js: https://www.chartjs.org/
- D3 Gradient: https://observablehq.com/@d3/gradient-encoding
- OpenAI API: https://openai.com/blog/openai-api
- Flask Server: https://flask.palletsprojects.com/en/3.0.x/