import { getPackageJson, getProjectRootPath } from './project';
import path from 'path';

// todo: memoize
export function getAllDependencies(): string[] {
	const packageJSON = getPackageJson();

	return [
		...Object.keys(packageJSON.dependencies ?? {}),
		...Object.keys(packageJSON.devDependencies ?? {}),
	];
}

// todo: memoize
export function hasDependency(dependencyName: string) {
	return getAllDependencies().includes(dependencyName);
}

// todo: memoize
export function getDependencyPath(dependencyName: string): string | null {
	try {
		const resolvedPath = require.resolve(`${dependencyName}/package.json`, {
			paths: [getProjectRootPath()],
		});

		return path.dirname(resolvedPath);
	} catch (err) {
		return null;
	}
}