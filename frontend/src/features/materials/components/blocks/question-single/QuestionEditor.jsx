import ParameterEditor from "../../ParameterEditor";
import QuestionEditorFields from "./QuestionEditorFields";

export default function QuestionEditor({ data, onChange, onSave, onCancel, onDelete }) 
{

    return(
        <div className="mb-6">
            {/* Parameter Editor */}
            <ParameterEditor 
                title="Question Settings" 
                onSave={onSave}
                onCancel={onCancel} 
                onDelete={onDelete}
            >
                <QuestionEditorFields 
                    question={data} 
                    onChange={onChange} 
                />
            </ParameterEditor>
        </div>
    );
}