import React from 'react';
import type { ValidationIssue } from '../types';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ValidationPanelProps {
  issues: ValidationIssue[];
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ issues }) => {
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warn');

  return (
    <div className="bg-cyber-darker border border-cyber-border rounded-lg p-4">
      <h3 className="text-sm font-bold text-cyber-neon-cyan mb-3 uppercase tracking-wider">
        Validation Report
      </h3>

      {issues.length === 0 ? (
        <div className="flex items-center gap-2 text-cyber-neon-green text-sm">
          <CheckCircle size={16} />
          <span>All validations passed</span>
        </div>
      ) : (
        <div className="space-y-2 text-xs max-h-32 overflow-y-auto">
          {errors.length > 0 && (
            <>
              <div className="text-cyber-neon-pink font-bold">ERRORS ({errors.length})</div>
              {errors.map(issue => (
                <div key={issue.id} className="flex gap-2 text-cyber-neon-pink pl-2">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{issue.message}</span>
                </div>
              ))}
            </>
          )}

          {warnings.length > 0 && (
            <>
              <div className="text-cyber-neon-yellow font-bold mt-2">WARNINGS ({warnings.length})</div>
              {warnings.map(issue => (
                <div key={issue.id} className="flex gap-2 text-cyber-neon-yellow pl-2">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{issue.message}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
