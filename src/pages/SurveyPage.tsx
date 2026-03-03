import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tasks = [
  'Create a new unit',
  'Invite a new user to a unit with a specific role (Admin/Editor/Viewer)',
  'Edit a user\'s role within a unit and verify the change in Activity Logs',
  'Add a domain to the Allow List',
  'Go to Team Overview, add a new admin',
  'Remove a user from a unit',
];

const likertOptions = [
  { value: '1', label: 'Strongly Disagree' },
  { value: '2', label: 'Disagree' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Agree' },
  { value: '5', label: 'Strongly Agree' },
];

const taskSpecificQuestions: string[][] = [
  [
    'The "Add Unit" button was easy to find.',
    'The required fields (name, acronym, department) were clear.',
    'I received clear confirmation that the unit was created.',
  ],
  [
    'The process of inviting a user was intuitive.',
    'The role options (Admin/Editor/Viewer) were clearly explained.',
    'I was confident the invitation was sent successfully.',
  ],
  [
    'Editing a user\'s role was straightforward.',
    'The Activity Logs clearly showed the role change.',
    'I could easily find and verify the change in the logs.',
  ],
  [
    'Adding a domain to the Allow List was easy to find.',
    'The input format for the domain was clear.',
    'I received clear feedback that the domain was added.',
  ],
  [
    'Navigating to Team Overview was intuitive.',
    'The process of adding a new admin was clear.',
    'I understood the difference between admin roles.',
  ],
  [
    'The option to remove a user was easy to find.',
    'The confirmation dialog clearly explained the consequences.',
    'I felt confident the removal was completed.',
  ],
];

interface TaskAnswers {
  completed: string;
  ease: string;
  errors: string;
  specific: string[];
  comments: string;
}

const emptyTaskAnswers = (): TaskAnswers => ({
  completed: '',
  ease: '',
  errors: '',
  specific: ['', '', ''],
  comments: '',
});

interface OverallAnswers {
  mostConfusing: string;
  missingFeatures: string;
  overallImpression: string;
  additionalComments: string;
}

export default function SurveyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-6 = tasks, 7 = overall, 8 = done
  const [taskAnswers, setTaskAnswers] = useState<TaskAnswers[]>(
    tasks.map(() => emptyTaskAnswers())
  );
  const [overallAnswers, setOverallAnswers] = useState<OverallAnswers>({
    mostConfusing: '',
    missingFeatures: '',
    overallImpression: '',
    additionalComments: '',
  });

  const totalSteps = tasks.length + 2; // intro + tasks + overall
  const progress = currentStep === 0 ? 0 : (currentStep / totalSteps) * 100;

  const updateTaskAnswer = (taskIdx: number, field: keyof TaskAnswers, value: string, specificIdx?: number) => {
    setTaskAnswers(prev => {
      const updated = [...prev];
      if (field === 'specific' && specificIdx !== undefined) {
        const specificCopy = [...updated[taskIdx].specific];
        specificCopy[specificIdx] = value;
        updated[taskIdx] = { ...updated[taskIdx], specific: specificCopy };
      } else {
        updated[taskIdx] = { ...updated[taskIdx], [field]: value };
      }
      return updated;
    });
  };

  const handleExport = () => {
    const data = {
      taskResponses: tasks.map((task, i) => ({
        task,
        ...taskAnswers[i],
        specificQuestions: taskSpecificQuestions[i].map((q, j) => ({
          question: q,
          answer: taskAnswers[i].specific[j],
        })),
      })),
      overall: overallAnswers,
      submittedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-response-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCurrentStep(totalSteps + 1);
  };

  const renderIntro = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Usability Testing Survey</CardTitle>
        <CardDescription className="text-base mt-2">
          Thank you for testing the Logto Manager prototype. This survey will ask you about your experience with each of the 6 tasks you performed. It should take about 5–8 minutes to complete.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground space-y-1 text-center">
          <p>The tasks you tested:</p>
          <ol className="list-decimal list-inside text-left inline-block">
            {tasks.map((t, i) => (
              <li key={i} className="py-0.5">{t}</li>
            ))}
          </ol>
        </div>
        <Button onClick={() => setCurrentStep(1)} size="lg" className="mt-4">
          Start Survey <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderTaskStep = (taskIdx: number) => {
    const answers = taskAnswers[taskIdx];
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardDescription>Task {taskIdx + 1} of {tasks.length}</CardDescription>
          <CardTitle className="text-lg">{tasks[taskIdx]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Completed */}
          <div className="space-y-3">
            <Label className="font-medium">Were you able to complete this task?</Label>
            <RadioGroup value={answers.completed} onValueChange={v => updateTaskAnswer(taskIdx, 'completed', v)}>
              <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id={`c-y-${taskIdx}`} /><Label htmlFor={`c-y-${taskIdx}`}>Yes, easily</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="difficulty" id={`c-d-${taskIdx}`} /><Label htmlFor={`c-d-${taskIdx}`}>Yes, but with difficulty</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="no" id={`c-n-${taskIdx}`} /><Label htmlFor={`c-n-${taskIdx}`}>No</Label></div>
            </RadioGroup>
          </div>

          {/* Ease */}
          <div className="space-y-3">
            <Label className="font-medium">The task was easy to complete.</Label>
            <RadioGroup value={answers.ease} onValueChange={v => updateTaskAnswer(taskIdx, 'ease', v)} className="flex flex-wrap gap-3">
              {likertOptions.map(o => (
                <div key={o.value} className="flex items-center space-x-1.5">
                  <RadioGroupItem value={o.value} id={`e-${taskIdx}-${o.value}`} />
                  <Label htmlFor={`e-${taskIdx}-${o.value}`} className="text-sm">{o.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Errors */}
          <div className="space-y-3">
            <Label className="font-medium">Did you encounter any errors or confusion?</Label>
            <RadioGroup value={answers.errors} onValueChange={v => updateTaskAnswer(taskIdx, 'errors', v)}>
              <div className="flex items-center space-x-2"><RadioGroupItem value="none" id={`er-n-${taskIdx}`} /><Label htmlFor={`er-n-${taskIdx}`}>No issues</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="minor" id={`er-m-${taskIdx}`} /><Label htmlFor={`er-m-${taskIdx}`}>Minor confusion</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="major" id={`er-j-${taskIdx}`} /><Label htmlFor={`er-j-${taskIdx}`}>Major issues / got stuck</Label></div>
            </RadioGroup>
          </div>

          {/* Task-specific Likert questions */}
          {taskSpecificQuestions[taskIdx].map((q, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <Label className="font-medium">{q}</Label>
              <RadioGroup value={answers.specific[qIdx]} onValueChange={v => updateTaskAnswer(taskIdx, 'specific', v, qIdx)} className="flex flex-wrap gap-3">
                {likertOptions.map(o => (
                  <div key={o.value} className="flex items-center space-x-1.5">
                    <RadioGroupItem value={o.value} id={`s-${taskIdx}-${qIdx}-${o.value}`} />
                    <Label htmlFor={`s-${taskIdx}-${qIdx}-${o.value}`} className="text-sm">{o.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          {/* Comments */}
          <div className="space-y-2">
            <Label className="font-medium">Any additional comments on this task?</Label>
            <Textarea
              value={answers.comments}
              onChange={e => updateTaskAnswer(taskIdx, 'comments', e.target.value)}
              placeholder="Optional — share any thoughts or suggestions..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderOverall = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Overall Impressions</CardTitle>
        <CardDescription>A few final questions about your overall experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="font-medium">Which task was the most confusing or difficult? Why?</Label>
          <Textarea value={overallAnswers.mostConfusing} onChange={e => setOverallAnswers(p => ({ ...p, mostConfusing: e.target.value }))} placeholder="e.g. Task 3 because..." className="min-h-[80px]" />
        </div>
        <div className="space-y-2">
          <Label className="font-medium">Were there any features or information you expected to find but didn't?</Label>
          <Textarea value={overallAnswers.missingFeatures} onChange={e => setOverallAnswers(p => ({ ...p, missingFeatures: e.target.value }))} placeholder="e.g. I expected to see..." className="min-h-[80px]" />
        </div>
        <div className="space-y-3">
          <Label className="font-medium">Overall, the prototype was easy to use.</Label>
          <RadioGroup value={overallAnswers.overallImpression} onValueChange={v => setOverallAnswers(p => ({ ...p, overallImpression: v }))} className="flex flex-wrap gap-3">
            {likertOptions.map(o => (
              <div key={o.value} className="flex items-center space-x-1.5">
                <RadioGroupItem value={o.value} id={`ov-${o.value}`} />
                <Label htmlFor={`ov-${o.value}`} className="text-sm">{o.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label className="font-medium">Any other comments or suggestions?</Label>
          <Textarea value={overallAnswers.additionalComments} onChange={e => setOverallAnswers(p => ({ ...p, additionalComments: e.target.value }))} placeholder="Anything else you'd like to share..." className="min-h-[80px]" />
        </div>
      </CardContent>
    </Card>
  );

  const renderDone = () => (
    <Card className="max-w-2xl mx-auto text-center">
      <CardContent className="py-12 space-y-4">
        <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Thank you!</h2>
        <p className="text-muted-foreground">Your survey response has been downloaded as a JSON file. Please share it with the research team.</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prototype
        </Button>
      </CardContent>
    </Card>
  );

  const isLastTask = currentStep === tasks.length;
  const isOverall = currentStep === tasks.length + 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-card px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">Usability Survey</h1>
          {currentStep > 0 && currentStep <= totalSteps && (
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          )}
        </div>
        {currentStep > 0 && currentStep <= totalSteps && (
          <div className="max-w-2xl mx-auto mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-6">
        {currentStep === 0 && renderIntro()}
        {currentStep >= 1 && currentStep <= tasks.length && renderTaskStep(currentStep - 1)}
        {isOverall && renderOverall()}
        {currentStep > totalSteps && renderDone()}
      </div>

      {currentStep >= 1 && currentStep <= totalSteps && (
        <div className="border-t bg-card px-6 py-4">
          <div className="max-w-2xl mx-auto flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {isOverall ? (
              <Button onClick={handleExport}>
                Submit & Download <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setCurrentStep(s => s + 1)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
