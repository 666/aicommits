import type { CommitType } from './config.js';

const commitTypeFormats: Record<CommitType, string> = {
	'': 'commit message',
	conventional: '<type>(<optional scope>): <description>',
};
const specifyCommitFormat = (type: CommitType) =>
	`Replace the placeholders in this format with actual content:\n${commitTypeFormats[type]}`;

const commitTypes: Record<CommitType, string> = {
	'': '',

	/**
	 * References:
	 * Commitlint:
	 * https://github.com/conventional-changelog/commitlint/blob/18fbed7ea86ac0ec9d5449b4979b762ec4305a92/%40commitlint/config-conventional/index.js#L40-L100
	 *
	 * Conventional Changelog:
	 * https://github.com/conventional-changelog/conventional-changelog/blob/d0e5d5926c8addba74bc962553dd8bcfba90e228/packages/conventional-changelog-conventionalcommits/writer-opts.js#L182-L193
	 */
	conventional: `Choose a type from the type-to-description JSON below that best describes the git diff:\n${JSON.stringify(
		{
			docs: 'Documentation only changes',
			style:
				'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
			refactor: 'A code change that neither fixes a bug nor adds a feature',
			perf: 'A code change that improves performance',
			test: 'Adding missing tests or correcting existing tests',
			build: 'Changes that affect the build system or external dependencies',
			ci: 'Changes to our CI configuration files and scripts',
			chore: "Other changes that don't modify src or test files",
			revert: 'Reverts a previous commit',
			feat: 'A new feature',
			fix: 'A bug fix',
		},
		null,
		2
	)}`,
};

export const generatePrompt = (
	locale: string,
	maxLength: number,
	type: CommitType
) =>
	[
		'Generate a git commit message following these guidelines:',
		'1. First line: A clear, objective summary of WHAT was changed',
		`   - Maximum ${maxLength} characters`,
		'   - Written in present tense',
		'   - No period at the end',
		'',
		'2. Followed by TWO blank lines',
		'',
		'3. Then a detailed description explaining:',
		'   - WHY the change was made (the rationale)',
		'   - Any important implementation details that future developers should know',
		'   - Breaking changes or deprecations, if any',
		'   - Each paragraph should focus on one aspect',
		'',
		'4. Technical details:',
		'   - Use backticks (`) for code elements',
		`   - Output in ${locale} language`,
		'   - No unnecessary translations or metadata',
		'   - Do not include placeholder text like <commit message> in the output',
		'',
		commitTypes[type],
		specifyCommitFormat(type),
	]
		.filter(Boolean)
		.join('\n');
